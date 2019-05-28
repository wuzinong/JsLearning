using System;
using System.Threading;
using System.Threading.Tasks;

namespace Test
{
    class Program
    {
        static int counter = 1;

        static void Main(string[] args)
        {
            //            一、线程简义

            //1、进程与线程：进程作为操作系统执行程序的基本单位，拥有应用程序的资源，进程包含线程，进程的资源被线程共享，线程不拥有资源。

            //2、前台线程和后台线程：通过Thread类新建线程默认为前台线程。当所有前台线程关闭时，所有的后台线程也会被直接终止，不会抛出异常。

            //3、挂起（Suspend）和唤醒（Resume）：由于线程的执行顺序和程序的执行情况不可预知，所以使用挂起和唤醒容易发生死锁的情况，在实际应用中应该尽量少用。

            //4、阻塞线程：Join，阻塞调用线程，直到该线程终止。

            //5、终止线程：Abort：抛出 ThreadAbortException 异常让线程终止，终止后的线程不可唤醒。Interrupt：抛出 ThreadInterruptException 异常让线程终止，通过捕获异常可以继续执行。

            //6、线程优先级：AboveNormal BelowNormal Highest Lowest Normal，默认为Normal。


            //线程  线程函数通过委托传递，可以不带参数，也可以带参数（只能有一个参数），可以用一个类或结构体封装参数。
            //Thread t1 = new Thread(new ThreadStart(TestMethod));
            //Thread t2 = new Thread(new ParameterizedThreadStart(TestMethod));
            //t1.IsBackground = true;
            //t2.IsBackground = true;
            //t1.Start();
            //t2.Start("hello");
            //Console.ReadKey();

            //线程池
            //ThreadPool.QueueUserWorkItem(TestMethod, "Hello test");
            //Console.ReadKey();

            //Task类
            //使用ThreadPool的QueueUserWorkItem()方法发起一次异步的线程执行很简单，但是该方法最大的问题是没有一个内建的机制让你知道操作什么时候完成，
            //有没有一个内建的机制在操作完成后获得一个返回值。为此，可以使用System.Threading.Tasks中的Task类。
            //构造一个Task<TResult> 对象，并为泛型TResult参数传递一个操作的返回类型。
            //Task<Int32> t = new Task<Int32>(n => Sum((Int32)n), 100);
            //t.Start();
            //t.Wait();
            //Console.WriteLine(t.Result);
            //Console.ReadKey();

            //一个任务完成时，自动启动一个新任务。
            //一个任务完成后，它可以启动另一个任务，下面重写了前面的代码，不阻塞任何线程。
            //Task<Int32> t = new Task<Int32>(n => Sum((Int32)n), 1000);
            //t.Start();
            ////t.Wait();
            //Task cwt = t.ContinueWith(task => Console.WriteLine("The result is {0}", t.Result));
            //Console.ReadKey();

            //五、委托异步执行
            //委托的异步调用：BeginInvoke() 和 EndInvoke()
            //MyDelegate mydelegate = new MyDelegate(TestMethod2);
            //IAsyncResult result = mydelegate.BeginInvoke("Thread Param", TestCallback, "Callback Param");

            ////异步执行完成
            //string resultstr = mydelegate.EndInvoke(result);
            //Console.WriteLine(resultstr);


            //六、线程同步
            //1）原子操作（Interlocked）：帮助保护免受计划程序切换上下文时某个线程正在更新可以由其他线程访问的变量或者在单独的
            //     处理器上同时执行两个线程就可能出现的错误。 此类的成员不会引发异常。
            // Thread t1 = new Thread(new ThreadStart(F1));
            // Thread t2 = new Thread(new ThreadStart(F2));

            // t1.Start();
            // t2.Start();

            // t1.Join();
            // t2.Join();

            // System.Console.ReadKey();

            //2）lock () 语句：避免锁定public类型，否则实例将超出代码控制的范围，定义private对象来锁定。而自定义类推荐用私有的只读静态对象，
            //比如：private static readonly object obj = new object(); 为什么要设置成只读的呢？这时因为如果在lock代码段中改变obj的值
            //，其它线程就畅通无阻了，因为互斥锁的对象变了，object.ReferenceEquals必然返回false。Array 类型提供 SyncRoot。许多集合类型也提供 SyncRoot。

            //3）Monitor实现线程同步
         //   通过Monitor.Enter() 和 Monitor.Exit()实现排它锁的获取和释放，获取之后独占资源，不允许其他线程访问。
　　　　     //还有一个TryEnter方法，请求不到资源时不会阻塞等待，可以设置超时时间，获取不到直接返回false。

            // try
            // {
            //     Monitor.Enter(obj);
            //     dosomething();
            // }
            // catch(Exception ex)
            // {
                
            // }
            // finally
            // {
            //     Monitor.Exit(obj);
            // }


            //　　4）ReaderWriterLock
            // 当对资源操作读多写少的时候，为了提高资源的利用率，让读操作锁为共享锁，多个线程可以并发读取资源，而写操作为独占锁，只允许一个线程操作。
    //         class SynchronizedCache  
    // {  
    //     private ReaderWriterLockSlim cacheLock = new ReaderWriterLockSlim();  
    //     private Dictionary<int, string> innerCache = new Dictionary<int, string>();  
  
    //     public string Read(int key)  
    //     {  
    //         cacheLock.EnterReadLock();  
    //         try  
    //         {  
    //             return innerCache[key];  
    //         }  
    //         finally  
    //         {  
    //             cacheLock.ExitReaderLock();  
    //         }  
    //     }  
  
    //     public void Add(int key, string value)  
    //     {  
    //         cacheLock.EnterWriteLock();  
    //         try  
    //         {  
    //             innerCache.Add(key, value);  
    //         }  
    //         finally  
    //         {  
    //             cacheLock.ExitWriteLock();  
    //         }  
    //     }  
  
    //     public bool AddWithTimeout(int key, string value, int timeout)  
    //     {  
    //         if (cacheLock.TryEnterWriteLock(timeout))  
    //         {  
    //             try  
    //             {  
    //                 innerCache.Add(key, value);  
    //             }  
    //             finally  
    //             {  
    //                 cacheLock.ExitReaderLock();  
    //             }  
    //             return true;  
    //         }  
    //         else  
    //         {  
    //             return false;  
    //         }  
    //     }  
  
    //     public AddOrUpdateStatus AddOrUpdate(int key, string value)  
    //     {  
    //         cacheLock.EnterUpgradeableReadLock();  
    //         try  
    //         {  
    //             string result = null;  
    //             if (innerCache.TryGetValue(key, out result))  
    //             {  
    //                 if (result == value)  
    //                 {  
    //                     return AddOrUpdateStatus.Unchanged;  
    //                 }  
    //                 else  
    //                 {  
    //                     cacheLock.EnterWriteLock();  
    //                     try  
    //                     {  
    //                         innerCache[key] = value;  
    //                     }  
    //                     finally  
    //                     {  
    //                         cacheLock.ExitWriteLock();  
    //                     }  
    //                     return AddOrUpdateStatus.Updated;  
    //                 }  
    //             }  
    //             else  
    //             {  
    //                 cacheLock.EnterWriteLock();  
    //                 try  
    //                 {  
    //                     innerCache.Add(key, value);  
    //                 }  
    //                 finally  
    //                 {  
    //                     cacheLock.ExitWriteLock();  
    //                 }  
    //                 return AddOrUpdateStatus.Added;  
    //             }  
    //         }  
    //         finally  
    //         {  
    //             cacheLock.ExitUpgradeableReadLock();  
    //         }  
    //     }  
  
    //     public void Delete(int key)  
    //     {  
    //         cacheLock.EnterWriteLock();  
    //         try  
    //         {  
    //             innerCache.Remove(key);  
    //         }  
    //         finally  
    //         {  
    //             cacheLock.ExitWriteLock();  
    //         }  
    //     }  
  
    //     public enum AddOrUpdateStatus  
    //     {  
    //         Added,  
    //         Updated,  
    //         Unchanged  
    //     };  
    // }


//     5）事件（Event）类实现同步

// 　　　　事件类有两种状态，终止状态和非终止状态，终止状态时调用WaitOne可以请求成功，通过Set将时间状态设置为终止状态。

// 　　　　1）AutoResetEvent（自动重置事件）

// 　　　　2）ManualResetEvent（手动重置事件）

//               AutoResetEvent和ManualResetEvent这两个类经常用到, 他们的用法很类似，但也有区别。Set方法将信号置为发送状态，Reset方法将信号置为不发送状态,WaitOne等待信号的发送。可以通过构造函数的参数值来决定其初始状态，若为true则非阻塞状态，为false为阻塞状态。如果某个线程调用WaitOne方法,则当信号处于发送状态时,该线程会得到信号, 继续向下执行。其区别就在调用后,AutoResetEvent.WaitOne()每次只允许一个线程进入,当某个线程得到信号后,AutoResetEvent会自动又将信号置为不发送状态,则其他调用WaitOne的线程只有继续等待.也就是说,AutoResetEvent一次只唤醒一个线程;而ManualResetEvent则可以唤醒多个线程,因为当某个线程调用了ManualResetEvent.Set()方法后,其他调用WaitOne的线程获得信号得以继续执行,而ManualResetEvent不会自动将信号置为不发送。也就是说,除非手工调用了ManualResetEvent.Reset()方法,则ManualResetEvent将一直保持有信号状态,ManualResetEvent也就可以同时唤醒多个线程继续执行。

// 　　6）信号量（Semaphore）

// 　　　　　　信号量是由内核对象维护的int变量，为0时，线程阻塞，大于0时解除阻塞，当一个信号量上的等待线程解除阻塞后，信号量计数+1。

// 　　　　　　线程通过WaitOne将信号量减1，通过Release将信号量加1，使用很简单。

// public Thread thrd;
//         //创建一个可授权2个许可证的信号量，且初始值为2
//         static Semaphore sem = new Semaphore(2, 2);
 
//         public mythread(string name)
//         {
//             thrd = new Thread(this.run);
//             thrd.Name = name;
//             thrd.Start();
//         }
//         void run()
//         {
//             Console.WriteLine(thrd.Name + "正在等待一个许可证……");
//             //申请一个许可证
//             sem.WaitOne();
//             Console.WriteLine(thrd.Name + "申请到许可证……");
//             for (int i = 0; i < 4 ; i++)
//             {
//                 Console.WriteLine(thrd.Name + "： " + i);
//                 Thread.Sleep(1000);
//             }
//             Console.WriteLine(thrd.Name + " 释放许可证……");
//             //释放
//             sem.Release();
//         }
//     }
 
//     class mysemaphore
//     {
//         public static void Main()
//         {
//             mythread mythrd1 = new mythread("Thrd #1");
//             mythread mythrd2 = new mythread("Thrd #2");
//             mythread mythrd3 = new mythread("Thrd #3");
//             mythread mythrd4 = new mythread("Thrd #4");
//             mythrd1.thrd.Join();
//             mythrd2.thrd.Join();
//             mythrd3.thrd.Join();
//             mythrd4.thrd.Join();
//         }
//     }

//7）互斥体（Mutex）

// 　　　　　　独占资源，可以把Mutex看作一个出租车，乘客看作线程。乘客首先等车，然后上车，最后下车。当一个乘客在车上时，
//其他乘客就只有等他下车以后才可以上车。而线程与C# Mutex对象的关系也正是如此，线程使用Mutex.WaitOne()方法等待C# Mutex对象被释放，
//如果它等待的C# Mutex对象被释放了，它就自动拥有这个对象，直到它调用Mutex.ReleaseMutex()方法释放这个对象，而在此期间，
//其他想要获取这个C# Mutex对象的线程都只有等待。
// /// <summary>
//         /// 应用程序的主入口点。
//         /// </summary>
//         [STAThread]
//         static void Main(string[] args)
//         {
//             bool flag = false;
//             System.Threading.Mutex mutex = new System.Threading.Mutex(true, "Test", out flag);
//             //第一个参数:true--给调用线程赋予互斥体的初始所属权
//             //第一个参数:互斥体的名称
//             //第三个参数:返回值,如果调用线程已被授予互斥体的初始所属权,则返回true
//             if (flag)
//             {
//                 Console.Write("Running");
//             }
//             else
//             {
//                 Console.Write("Another is Running");
//                 System.Threading.Thread.Sleep(5000);//线程挂起5秒钟
//                 Environment.Exit(1);//退出程序
//             }
//             Console.ReadLine();
//         }


//             8）跨进程间的同步

// 　　　　　　通过设置同步对象的名称就可以实现系统级的同步，不同应用程序通过同步对象的名称识别不同同步对象。
// string MutexName = "InterProcessSyncName";
//             Mutex SyncNamed;     //声明一个已命名的互斥对象
//              try
//             {
//                 SyncNamed = Mutex.OpenExisting(MutexName);       //如果此命名互斥对象已存在则请求打开
//             }
//             catch (WaitHandleCannotBeOpenedException)
//             {
//                 SyncNamed = new Mutex(false, MutexName);         //如果初次运行没有已命名的互斥对象则创建一个
//             }
//             Task MulTesk = new Task
//                 (
//                     () =>                  //多任务并行计算中的匿名方法，用委托也可以
//                     {
//                         for (; ; )         //为了效果明显而设计
//                         {
//                             Console.WriteLine("当前进程等待获取互斥访问权......");
//                             SyncNamed.WaitOne();
//                             Console.WriteLine("获取互斥访问权，访问资源完毕，按回车释放互斥资料访问权.");
//                             Console.ReadLine();
//                             SyncNamed.ReleaseMutex();
//                             Console.WriteLine("已释放互斥访问权。");
//                         }
//                     }
//                 );
//             MulTesk.Start();
//             MulTesk.Wait();
//  9）分布式的同步

// 　　可以使用redis任务队列或者redis相关特性
// Parallel.For(0, 1000000, i =>
//                     {
//                         Stopwatch sw1 = new Stopwatch();
//                         sw1.Start();

//                         if (redisHelper.GetRedisOperation().Lock(key))
//                         {
//                             var tt = int.Parse(redisHelper.GetRedisOperation().StringGet("calc"));

//                             tt++;

//                             redisHelper.GetRedisOperation().StringSet("calc", tt.ToString());

//                             redisHelper.GetRedisOperation().UnLock(key);
//                         }
//                         var v = sw1.ElapsedMilliseconds;
//                         if (v >= 10 * 1000)
//                         {
//                             Console.Write("f");
//                         }
//                         sw1.Stop();
//                     });

        }
        public delegate string MyDelegate(object data);
        public static void TestMethod()
        {
            Console.WriteLine("不带参数的线程函数");
        }

         public static string TestMethod2(object data)
        {
            string datastr = data as string;
            return datastr;
        }

        public static void TestCallback(IAsyncResult data)
        {
            Console.WriteLine(data.AsyncState);
        }


        public static void TestMethod(object data)
        {
            string datastr = data as string;
            Console.WriteLine("带参数的线程函数，参数为：{0}", datastr);
        }


        private static Int32 Sum(Int32 n)
        {
            Int32 sum = 0;
            for (; n > 0; --n)
                checked { sum += n; } //结果太大，抛出异常
            return sum;
        }
        static void F1()
        {
            for (int i = 0; i < 5; i++)
            {
                Interlocked.Increment(ref counter);
                System.Console.WriteLine("Counter++ {0}", counter);
                Thread.Sleep(10);
            }
        }

        static void F2()
        {
            for (int i = 0; i < 5; i++)
            {
                Interlocked.Decrement(ref counter);
                System.Console.WriteLine("Counter-- {0}", counter);
                Thread.Sleep(10);
            }
        }
    } 
}