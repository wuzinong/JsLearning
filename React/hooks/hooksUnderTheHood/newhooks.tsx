
let isMount = true;
let workInProgressHook = null;

const fiber={
    stateNode:App,
    memorizedState:null
}

function schedule(){
    workInProgressHook = fiber.memorizedState;
    fiber.stateNode();
    isMount = false;
}

function useState(initialState){
    let hook;
    if(isMount){
        hook = {
            memorizedState:initialState,
            next:null,
            queue:{
                pending:null
            }
        }
        if(!fiber.memorizedState){
            fiber.memorizedState = hook;
        }else{
            workInProgressHook.next = hook;
        }
        
        workInProgressHook = hook;
    }else{
        hook = workInProgressHook;
        workInProgressHook = workInProgressHook.next;
    }

    let baseState = hook.memorizedState;
    if(hook.queue.pending){
        let firstUpdate = hook.queue.pending.next;
        do{
            const action = firstUpdate.action;
            baseState = action(baseState);
            firstUpdate = firstUpdate.next;
        }while(firstUpdate !== hook.queue.pending.next)

        hook.queue.pending = null;
    }
    hook.memorizedState = baseState;
    return [baseState,dispatchAction.bind(null,hook.queue)]
}

function dispatchAction(queue,action){
    const update = {
        action,
        next:null
    }
    //换装链表
    if(queue.pending ===null){
        //u0 -> u0 -> u0
        update.next = update;
    }else{
        //u0 -> u0
        //u1 -> u0 -> u1
        update.next = queue.pending.next;
        queue.pending.next = update;
    }
    queue.pending = update;
    schedule();
}

function App(){
    const [num,updateNum]  = useState(0);

    return {
        onClick(){
            updateNum(num=>num+1)
        }
    }
}

window.app = schedule();