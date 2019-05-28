https://www.cnblogs.com/yswenli/p/7421475.html

博客园首页新随笔联系订阅 管理
随笔 - 64  文章 - 3  评论 - 202
C# 多线程及同步简介示例
       60年代，在OS中能拥有资源和独立运行的基本单位是进程，然而随着计算机技术的发展，进程出现了很多弊端，一是由于进程是资源拥有者，创建、撤消与切换存在较大的时空开销，因此需要引入轻型进程；二是由于对称多处理机（SMP）出现，可以满足多个运行单位，而多个进程并行开销过大。
因此在80年代，出现了能独立运行的基本单位——线程（Threads）。
       线程，有时被称为轻量级进程(Lightweight Process，LWP），是程序执行流的最小单元。一个标准的线程由线程ID，当前指令指针(PC），寄存器集合和堆栈组成。另外，线程是进程中的一个实体，是被系统独立调度和分派的基本单位，线程自己不拥有系统资源，只拥有一点儿在运行中必不可少的资源，但它可与同属一个进程的其它线程共享进程所拥有的全部资源。一个线程可以创建和撤消另一个线程，同一进程中的多个线程之间可以并发执行。由于线程之间的相互制约，致使线程在运行中呈现出间断性。线程也有就绪、阻塞和运行三种基本状态。就绪状态是指线程具备运行的所有条件，逻辑上可以运行，在等待处理机；运行状态是指线程占有处理机正在运行；阻塞状态是指线程在等待一个事件（如某个信号量），逻辑上不可执行。每一个程序都至少有一个线程，若程序只有一个线程，那就是程序本身。
       线程是程序中一个单一的顺序控制流程。进程内一个相对独立的、可调度的执行单元，是系统独立调度和分派CPU的基本单位指运行中的程序的调度单位。在单个程序中同时运行多个线程完成不同的工作，称为多线程。

 

一、线程简义

1、进程与线程：进程作为操作系统执行程序的基本单位，拥有应用程序的资源，进程包含线程，进程的资源被线程共享，线程不拥有资源。

2、前台线程和后台线程：通过Thread类新建线程默认为前台线程。当所有前台线程关闭时，所有的后台线程也会被直接终止，不会抛出异常。

3、挂起（Suspend）和唤醒（Resume）：由于线程的执行顺序和程序的执行情况不可预知，所以使用挂起和唤醒容易发生死锁的情况，在实际应用中应该尽量少用。

4、阻塞线程：Join，阻塞调用线程，直到该线程终止。

5、终止线程：Abort：抛出 ThreadAbortException 异常让线程终止，终止后的线程不可唤醒。Interrupt：抛出 ThreadInterruptException 异常让线程终止，通过捕获异常可以继续执行。

6、线程优先级：AboveNormal BelowNormal Highest Lowest Normal，默认为Normal。

二、线程的使用

线程函数通过委托传递，可以不带参数，也可以带参数（只能有一个参数），可以用一个类或结构体封装参数。

复制代码
 1 namespace Test
 2 {
 3     class Program
 4     {
 5         static void Main(string[] args)
 6         {
 7             Thread t1 = new Thread(new ThreadStart(TestMethod));
 8             Thread t2 = new Thread(new ParameterizedThreadStart(TestMethod));
 9             t1.IsBackground = true;
10             t2.IsBackground = true;
11             t1.Start();
12             t2.Start("hello");
13             Console.ReadKey();
14         }
15 
16         public static void TestMethod()
17         {
18             Console.WriteLine("不带参数的线程函数");
19         }
20 
21         public static void TestMethod(object data)
22         {
23             string datastr = data as string;
24             Console.WriteLine("带参数的线程函数，参数为：{0}", datastr);
25         }
26     } 
27 }
复制代码
 

三、线程池

由于线程的创建和销毁需要耗费一定的开销，过多的使用线程会造成内存资源的浪费，出于对性能的考虑，于是引入了线程池的概念。线程池维护一个请求队列，线程池的代码从队列提取任务，然后委派给线程池的一个线程执行，线程执行完不会被立即销毁，这样既可以在后台执行任务，又可以减少线程创建和销毁所带来的开销。

线程池线程默认为后台线程（IsBackground）。

复制代码
 1     class Program
 2     {
 3         static void Main(string[] args)
 4         {
 5             //将工作项加入到线程池队列中，这里可以传递一个线程参数
 6             ThreadPool.QueueUserWorkItem(TestMethod, "Hello");
 7             Console.ReadKey();
 8         }
 9 
10         public static void TestMethod(object data)
11         {
12             string datastr = data as string;
13             Console.WriteLine(datastr);
14         }
15     }
复制代码
 

四、Task类

使用ThreadPool的QueueUserWorkItem()方法发起一次异步的线程执行很简单，但是该方法最大的问题是没有一个内建的机制让你知道操作什么时候完成，有没有一个内建的机制在操作完成后获得一个返回值。为此，可以使用System.Threading.Tasks中的Task类。

构造一个Task<TResult>对象，并为泛型TResult参数传递一个操作的返回类型。

复制代码
 1 class Program
 2     {
 3         static void Main(string[] args)
 4         {
 5             Task<Int32> t = new Task<Int32>(n => Sum((Int32)n), 1000);
 6             t.Start();
 7             t.Wait();
 8             Console.WriteLine(t.Result);
 9             Console.ReadKey();
10         }
11 
12         private static Int32 Sum(Int32 n)
13         {
14             Int32 sum = 0;
15             for (; n > 0; --n)
16                 checked{ sum += n;} //结果太大，抛出异常
17             return sum;
18         }
19     }
复制代码
 

一个任务完成时，自动启动一个新任务。
一个任务完成后，它可以启动另一个任务，下面重写了前面的代码，不阻塞任何线程。

复制代码
 1  class Program
 2     {
 3         static void Main(string[] args)
 4         {
 5             Task<Int32> t = new Task<Int32>(n => Sum((Int32)n), 1000);
 6             t.Start();
 7             //t.Wait();
 8             Task cwt = t.ContinueWith(task => Console.WriteLine("The result is {0}",t.Result));
 9             Console.ReadKey();
10         }
11 
12         private static Int32 Sum(Int32 n)
13         {
14             Int32 sum = 0;
15             for (; n > 0; --n)
16                 checked{ sum += n;} //结果溢出，抛出异常
17             return sum;
18         }
19     }
复制代码
 

五、委托异步执行

委托的异步调用：BeginInvoke() 和 EndInvoke()

复制代码
 1  public delegate string MyDelegate(object data);
 2     class Program
 3     {
 4         static void Main(string[] args)
 5         {
 6             MyDelegate mydelegate = new MyDelegate(TestMethod);
 7             IAsyncResult result = mydelegate.BeginInvoke("Thread Param", TestCallback, "Callback Param");
 8 
 9             //异步执行完成
10             string resultstr = mydelegate.EndInvoke(result);
11         }
12 
13         //线程函数
14         public static string TestMethod(object data)
15         {
16             string datastr = data as string;
17             return datastr;
18         }
19 
20         //异步回调函数
21         public static void TestCallback(IAsyncResult data)
22         {
23             Console.WriteLine(data.AsyncState);
24         }
25     }
复制代码
 

六、线程同步

　　1）原子操作（Interlocked）：帮助保护免受计划程序切换上下文时某个线程正在更新可以由其他线程访问的变量或者在单独的处理器上同时执行两个线程就可能出现的错误。 此类的成员不会引发异常。

复制代码
 1 class Program
 2     {
 3         static int counter = 1;
 4 
 5         static void Main(string[] args)
 6         {
 7             Thread t1 = new Thread(new ThreadStart(F1));
 8             Thread t2 = new Thread(new ThreadStart(F2));
 9 
10             t1.Start();
11             t2.Start();
12 
13             t1.Join();
14             t2.Join();
15 
16             System.Console.ReadKey();
17         }
18 
19         static void F1()
20         {
21             for (int i = 0; i < 5; i++)
22             {
23                 Interlocked.Increment(ref counter);
24                 System.Console.WriteLine("Counter++ {0}", counter);
25                 Thread.Sleep(10);
26             }
27         }
28 
29         static void F2()
30         {
31             for (int i = 0; i < 5; i++)
32             {
33                 Interlocked.Decrement(ref counter);
34                 System.Console.WriteLine("Counter-- {0}", counter);
35                 Thread.Sleep(10);
36             }
37         }
38     }
复制代码
 

　　2）lock()语句：避免锁定public类型，否则实例将超出代码控制的范围，定义private对象来锁定。而自定义类推荐用私有的只读静态对象，比如：private static readonly object obj = new object();为什么要设置成只读的呢？这时因为如果在lock代码段中改变obj的值，其它线程就畅通无阻了，因为互斥锁的对象变了，object.ReferenceEquals必然返回false。Array 类型提供 SyncRoot。许多集合类型也提供 SyncRoot。

　　3）Monitor实现线程同步

　　　　通过Monitor.Enter() 和 Monitor.Exit()实现排它锁的获取和释放，获取之后独占资源，不允许其他线程访问。

　　　　还有一个TryEnter方法，请求不到资源时不会阻塞等待，可以设置超时时间，获取不到直接返回false。

复制代码
 1         public void MonitorSomeThing()
 2         {
 3             try
 4             {
 5                 Monitor.Enter(obj);
 6                 dosomething();
 7             }
 8             catch(Exception ex)
 9             {
10                 
11             }
12             finally
13             {
14                 Monitor.Exit(obj);
15             }
16         }
复制代码
 

　　4）ReaderWriterLock

　　　　当对资源操作读多写少的时候，为了提高资源的利用率，让读操作锁为共享锁，多个线程可以并发读取资源，而写操作为独占锁，只允许一个线程操作。

复制代码
  1 class SynchronizedCache  
  2     {  
  3         private ReaderWriterLockSlim cacheLock = new ReaderWriterLockSlim();  
  4         private Dictionary<int, string> innerCache = new Dictionary<int, string>();  
  5   
  6         public string Read(int key)  
  7         {  
  8             cacheLock.EnterReadLock();  
  9             try  
 10             {  
 11                 return innerCache[key];  
 12             }  
 13             finally  
 14             {  
 15                 cacheLock.ExitReaderLock();  
 16             }  
 17         }  
 18   
 19         public void Add(int key, string value)  
 20         {  
 21             cacheLock.EnterWriteLock();  
 22             try  
 23             {  
 24                 innerCache.Add(key, value);  
 25             }  
 26             finally  
 27             {  
 28                 cacheLock.ExitWriteLock();  
 29             }  
 30         }  
 31   
 32         public bool AddWithTimeout(int key, string value, int timeout)  
 33         {  
 34             if (cacheLock.TryEnterWriteLock(timeout))  
 35             {  
 36                 try  
 37                 {  
 38                     innerCache.Add(key, value);  
 39                 }  
 40                 finally  
 41                 {  
 42                     cacheLock.ExitReaderLock();  
 43                 }  
 44                 return true;  
 45             }  
 46             else  
 47             {  
 48                 return false;  
 49             }  
 50         }  
 51   
 52         public AddOrUpdateStatus AddOrUpdate(int key, string value)  
 53         {  
 54             cacheLock.EnterUpgradeableReadLock();  
 55             try  
 56             {  
 57                 string result = null;  
 58                 if (innerCache.TryGetValue(key, out result))  
 59                 {  
 60                     if (result == value)  
 61                     {  
 62                         return AddOrUpdateStatus.Unchanged;  
 63                     }  
 64                     else  
 65                     {  
 66                         cacheLock.EnterWriteLock();  
 67                         try  
 68                         {  
 69                             innerCache[key] = value;  
 70                         }  
 71                         finally  
 72                         {  
 73                             cacheLock.ExitWriteLock();  
 74                         }  
 75                         return AddOrUpdateStatus.Updated;  
 76                     }  
 77                 }  
 78                 else  
 79                 {  
 80                     cacheLock.EnterWriteLock();  
 81                     try  
 82                     {  
 83                         innerCache.Add(key, value);  
 84                     }  
 85                     finally  
 86                     {  
 87                         cacheLock.ExitWriteLock();  
 88                     }  
 89                     return AddOrUpdateStatus.Added;  
 90                 }  
 91             }  
 92             finally  
 93             {  
 94                 cacheLock.ExitUpgradeableReadLock();  
 95             }  
 96         }  
 97   
 98         public void Delete(int key)  
 99         {  
100             cacheLock.EnterWriteLock();  
101             try  
102             {  
103                 innerCache.Remove(key);  
104             }  
105             finally  
106             {  
107                 cacheLock.ExitWriteLock();  
108             }  
109         }  
110   
111         public enum AddOrUpdateStatus  
112         {  
113             Added,  
114             Updated,  
115             Unchanged  
116         };  
117     }
复制代码
 

　　5）事件（Event）类实现同步

　　　　事件类有两种状态，终止状态和非终止状态，终止状态时调用WaitOne可以请求成功，通过Set将时间状态设置为终止状态。

　　　　1）AutoResetEvent（自动重置事件）

　　　　2）ManualResetEvent（手动重置事件）

              AutoResetEvent和ManualResetEvent这两个类经常用到, 他们的用法很类似，但也有区别。Set方法将信号置为发送状态，Reset方法将信号置为不发送状态,WaitOne等待信号的发送。可以通过构造函数的参数值来决定其初始状态，若为true则非阻塞状态，为false为阻塞状态。如果某个线程调用WaitOne方法,则当信号处于发送状态时,该线程会得到信号, 继续向下执行。其区别就在调用后,AutoResetEvent.WaitOne()每次只允许一个线程进入,当某个线程得到信号后,AutoResetEvent会自动又将信号置为不发送状态,则其他调用WaitOne的线程只有继续等待.也就是说,AutoResetEvent一次只唤醒一个线程;而ManualResetEvent则可以唤醒多个线程,因为当某个线程调用了ManualResetEvent.Set()方法后,其他调用WaitOne的线程获得信号得以继续执行,而ManualResetEvent不会自动将信号置为不发送。也就是说,除非手工调用了ManualResetEvent.Reset()方法,则ManualResetEvent将一直保持有信号状态,ManualResetEvent也就可以同时唤醒多个线程继续执行。

　　6）信号量（Semaphore）

　　　　　　信号量是由内核对象维护的int变量，为0时，线程阻塞，大于0时解除阻塞，当一个信号量上的等待线程解除阻塞后，信号量计数+1。

　　　　　　线程通过WaitOne将信号量减1，通过Release将信号量加1，使用很简单。

复制代码
 1         public Thread thrd;
 2         //创建一个可授权2个许可证的信号量，且初始值为2
 3         static Semaphore sem = new Semaphore(2, 2);
 4  
 5         public mythread(string name)
 6         {
 7             thrd = new Thread(this.run);
 8             thrd.Name = name;
 9             thrd.Start();
10         }
11         void run()
12         {
13             Console.WriteLine(thrd.Name + "正在等待一个许可证……");
14             //申请一个许可证
15             sem.WaitOne();
16             Console.WriteLine(thrd.Name + "申请到许可证……");
17             for (int i = 0; i < 4 ; i++)
18             {
19                 Console.WriteLine(thrd.Name + "： " + i);
20                 Thread.Sleep(1000);
21             }
22             Console.WriteLine(thrd.Name + " 释放许可证……");
23             //释放
24             sem.Release();
25         }
26     }
27  
28     class mysemaphore
29     {
30         public static void Main()
31         {
32             mythread mythrd1 = new mythread("Thrd #1");
33             mythread mythrd2 = new mythread("Thrd #2");
34             mythread mythrd3 = new mythread("Thrd #3");
35             mythread mythrd4 = new mythread("Thrd #4");
36             mythrd1.thrd.Join();
37             mythrd2.thrd.Join();
38             mythrd3.thrd.Join();
39             mythrd4.thrd.Join();
40         }
41     } 
复制代码
 

　　7）互斥体（Mutex）

　　　　　　独占资源，可以把Mutex看作一个出租车，乘客看作线程。乘客首先等车，然后上车，最后下车。当一个乘客在车上时，其他乘客就只有等他下车以后才可以上车。而线程与C# Mutex对象的关系也正是如此，线程使用Mutex.WaitOne()方法等待C# Mutex对象被释放，如果它等待的C# Mutex对象被释放了，它就自动拥有这个对象，直到它调用Mutex.ReleaseMutex()方法释放这个对象，而在此期间，其他想要获取这个C# Mutex对象的线程都只有等待。

复制代码
 1 class Test
 2     {
 3         /// <summary>
 4         /// 应用程序的主入口点。
 5         /// </summary>
 6         [STAThread]
 7         static void Main(string[] args)
 8         {
 9             bool flag = false;
10             System.Threading.Mutex mutex = new System.Threading.Mutex(true, "Test", out flag);
11             //第一个参数:true--给调用线程赋予互斥体的初始所属权
12             //第一个参数:互斥体的名称
13             //第三个参数:返回值,如果调用线程已被授予互斥体的初始所属权,则返回true
14             if (flag)
15             {
16                 Console.Write("Running");
17             }
18             else
19             {
20                 Console.Write("Another is Running");
21                 System.Threading.Thread.Sleep(5000);//线程挂起5秒钟
22                 Environment.Exit(1);//退出程序
23             }
24             Console.ReadLine();
25         }
26     }
复制代码
 

 　 8）跨进程间的同步

　　　　　　通过设置同步对象的名称就可以实现系统级的同步，不同应用程序通过同步对象的名称识别不同同步对象。

复制代码
 1  static void Main(string[] args)
 2         {
 3             string MutexName = "InterProcessSyncName";
 4             Mutex SyncNamed;     //声明一个已命名的互斥对象
 5              try
 6             {
 7                 SyncNamed = Mutex.OpenExisting(MutexName);       //如果此命名互斥对象已存在则请求打开
 8             }
 9             catch (WaitHandleCannotBeOpenedException)
10             {
11                 SyncNamed = new Mutex(false, MutexName);         //如果初次运行没有已命名的互斥对象则创建一个
12             }
13             Task MulTesk = new Task
14                 (
15                     () =>                  //多任务并行计算中的匿名方法，用委托也可以
16                     {
17                         for (; ; )         //为了效果明显而设计
18                         {
19                             Console.WriteLine("当前进程等待获取互斥访问权......");
20                             SyncNamed.WaitOne();
21                             Console.WriteLine("获取互斥访问权，访问资源完毕，按回车释放互斥资料访问权.");
22                             Console.ReadLine();
23                             SyncNamed.ReleaseMutex();
24                             Console.WriteLine("已释放互斥访问权。");
25                         }
26                     }
27                 );
28             MulTesk.Start();
29             MulTesk.Wait();
30         }
复制代码
 　 9）分布式的同步

　　可以使用redis任务队列或者redis相关特性

复制代码
 1                     Parallel.For(0, 1000000, i =>
 2                     {
 3                         Stopwatch sw1 = new Stopwatch();
 4                         sw1.Start();
 5 
 6                         if (redisHelper.GetRedisOperation().Lock(key))
 7                         {
 8                             var tt = int.Parse(redisHelper.GetRedisOperation().StringGet("calc"));
 9 
10                             tt++;
11 
12                             redisHelper.GetRedisOperation().StringSet("calc", tt.ToString());
13 
14                             redisHelper.GetRedisOperation().UnLock(key);
15                         }
16                         var v = sw1.ElapsedMilliseconds;
17                         if (v >= 10 * 1000)
18                         {
19                             Console.Write("f");
20                         }
21                         sw1.Stop();
22                     });
复制代码
 

 

 


转载请标明本文来源：http://www.cnblogs.com/yswenli/p/7421475.html 
更多内容欢迎star作者的github：https://github.com/yswenli/
如果发现本文有什么问题和任何建议，也随时欢迎交流~

 

感谢您的阅读，如果您对我的博客所讲述的内容有兴趣，请继续关注我的后续博客，我是yswenli 。

标签: C#, 线程, 多线程, 锁, 同步
好文要顶 关注我 收藏该文    
yswenli
关注 - 1
粉丝 - 91
+加关注
1
« 上一篇：Log4net使用详细说明
» 下一篇：C# MongoDB
posted @ 2017-08-24 09:47 yswenli 阅读(487) 评论(3) 编辑 收藏
评论列表
#1楼 2017-08-24 09:57 兴想事成
这是我见过最详细的关于C#线程的 博客了. 在一些比较特殊的地方,也用到了线程, 比如PLINQ, 并行查询.

List<int>initList = new List<int>(){0,1,2,3,4,5,6,7,8,9};
var query = from p in initList.AsParallel() select p;
foreach(int item in query)
{
Console.WriteLine(item.ToString());
}
#2楼[楼主] 2017-08-24 11:10 yswenli
@ Little Ming
PLINK内部实现其实是使用的Task~
#3楼 2019-05-22 22:40 monkey's
没有之一！！！
刷新评论刷新页面返回顶部
注册用户登录后才能发表评论，请 登录 或 注册，访问网站首页。
【推荐】超50万C++/C#源码: 大型实时仿真组态图形源码
【推荐】Java工作两年，一天竟收到33份面试通知
【推荐】程序员问答平台，解决您开发中遇到的技术难题

相关博文：
· C#多线程
· 《C#多线程编程实现方式》
· C#多线程编程
· C#多线程编程
· C#多线程编程

最新新闻：
· 最响亮的水下声音：音量之大竟然可以让水蒸发
· 华为副董事长胡厚崑：数字世界不能再竖起“柏林墙”
· 天文学家称在“圣诞彗星”中发现的水与地球的水十分类似
· 海思在淡季狂下台积电订单，现在终于知道原因了
· 德国创企Volocopter开建首个空中出租车起降设施
» 更多新闻...
公告
yswenli yswenli
LinkIn
Flag Counter
昵称：yswenli
园龄：5年10个月
粉丝：91
关注：1
+加关注
<	2019年5月	>
日	一	二	三	四	五	六
28	29	30	1	2	3	4
5	6	7	8	9	10	11
12	13	14	15	16	17	18
19	20	21	22	23	24	25
26	27	28	29	30	31	1
2	3	4	5	6	7	8
搜索
 
 
常用链接
我的随笔
我的评论
我的参与
最新评论
我的标签
最新随笔
1. WebApi测试工具：SAEA.RESTED
2. GFF高仿QQ客户端及服务器
3. span<T>之高性能字符串操作实测
4. 背包问题 —— 四种解法解题
5. 快速搭建日志系统——ELK STACK
6. C# - Span 全面介绍：探索 .NET 新增的重要组成部分
7. redis为什么这么火该怎么用
8. Zookeeper
9. git branch 分支操作
10. git 忽略无效解决办法
我的标签
C#(35)
Redis(10)
消息队列(8)
StackExchange.Redis(7)
Wenli.Drive.Redis(7)
MessageQueue(7)
Kafka(7)
tcp(5)
.net core(4)
APM(4)
更多
随笔档案
2019年3月 (1)
2018年11月 (2)
2018年10月 (1)
2018年9月 (2)
2018年8月 (6)
2018年7月 (3)
2018年6月 (2)
2018年5月 (2)
2018年4月 (1)
2018年3月 (2)
2018年2月 (1)
2018年1月 (1)
2017年12月 (1)
2017年10月 (1)
2017年9月 (1)
2017年8月 (8)
2017年7月 (3)
2017年6月 (3)
2017年4月 (2)
2017年3月 (1)
2017年2月 (1)
2017年1月 (12)
2016年12月 (7)
文章档案
2018年11月 (1)
2018年5月 (2)
相册
Weixin(7)
积分与排名
积分 -	65617
排名 -	8299
最新评论
1. Re:自已动手做高性能消息队列
这个厉害了！
--monkey's
2. Re:一个C#操作RabbitMQ的完整例子
你是不是写过一个哨兵模式的redis c#客户端，我看你名字好像，如果是，那么我项目中就用呢！目前很稳定！
--monkey's
3. Re:C# 多线程及同步简介示例
没有之一！！！
--monkey's
4. Re:C#如何使用ES
太好了，网上找很多教程例子在6.7.1都跑不起了，这个教程大部分都跑得起
--DHclly
5. Re:C#高性能二进制序列化
@
已经在github上看到了 ，谢谢大佬
--诺夏
阅读排行榜
1. NW.js 简介与使用(25760)
2. javascript之ProtoBuf在websocket中的使用(15882)
3. 跨平台Redis可视化工具Web Redis Manager(9658)
4. centos 7安装es 及异常处理(8735)
5. Ceph,TFS,FastDFS,MogileFS,MooseFS,GlusterFS 对比(8644)
评论排行榜
1. C# 输入法(40)
2. GFF高仿QQ客户端及服务器(26)
3. 跨平台Redis可视化工具Web Redis Manager(20)
4. C#高性能二进制序列化(16)
5. 自行实现高性能MVC(14)
推荐排行榜
1. C# 输入法(76)
2. 跨平台Redis可视化工具Web Redis Manager(19)
3. .net core实现redisClient(18)
4. 自行实现高性能MVC(12)
5. C#如何使用ES(10)
Copyright ©2019 yswenli