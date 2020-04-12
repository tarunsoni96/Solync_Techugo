import SocketIOClient from 'socket.io-client'

export default class SocketIO {

    constructor() {
        this.socket = SocketIOClient('http://13.232.62.239:6565');
    }

    listenEvent(event,callBack){
        this.socket.on(event, (data) => {
            callBack(data)
          });
    }

    offEvent(event,callBack){
        this.socket.off(event, () => {
            callBack(true)
          });
    }

    emitToEvent(event,data){
        this.socket.emit(event,data)
    }


}
