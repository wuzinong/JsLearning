import {receiveHelloWorldData} from './redux-actions';
import {IHelloWorldData} from './redux-actions';

export function retrieveData() {
    return (dispatch: <T>(action: any) => T, getState: () => any) => {
        fetch('/Home/GetHelloWorldData', { method: 'get' })
            .then(response => response.json())
            .then((data: IHelloWorldData) => dispatch(receiveHelloWorldData(data)))
            .catch(() => { }); // ignore errors in this example
    }
}