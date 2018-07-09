import axios from 'axios'

class Http {

    constructor() {
        this.Load()
    }

    Load() {
        this.api = axios.create({
            baseURL: 'https://caseteambserver-wkxcvgrrxm.now.sh',
            headers: {
                'ContentType': 'application/json',
                'Authorization': this.GetToken()
            },
            responseType: 'json'
        })
    }

    SetToken(t) {
        localStorage.setItem("token", t)
        http.Load();
    }
    GetToken() {
        return localStorage.getItem("token")
    }
    RemoveToken() {
        localStorage.removeItem("token")
    }

    signin(name, pass) {
        return this.api.post('/signin', {
            name,
            pass
        })
    }
    signup(name, pass) {
        return this.api.post('/signup', {
            name,
            pass
        })
    }

    registDevice(goal_id) {
        return this.api.post('/device', {
            goal_id
        })
    }
    getDevice() {
        return this.api.get('/device')
    }
    removeDevice(device_id) {
        return this.api.delete('/device/' + device_id)
    }
    getChild() {
        return this.api.get('/child')
    }
    addChild(nickname, birthday, sex) {
        return this.api.post('/child', {
            nickname,
            birthday,
            sex
        })
    }
    removeChild(child_id) {
        return this.api.delete('/child/' + child_id)
    }
    addGoal(child_id, content, criteria, deadline) {
        return this.api.post('/goal', {
            child_id,
            content,
            criteria,
            deadline
        })
    }
    putGoal(goal_id, device_id) {
        return api.put('/goal', {
            goal_id,
            device_id
        })
    }
    getGoal() {
        return this.api.get('/goal')
    }
    removeGoal(goal_id) {
        return api.delete('/goal' + goal_id, {
        })
    }
    addMessage(goal_id, message_call, message) {
        return this.api.post('/message', {
            goal_id,
            message_call,
            message
        })
    }
    getMessage() {
        return this.api.get('/message')
    }
    removeMessage(goal_id, message_call) {
        return this.api.delete('/message/' + goal_id + message_call)
    }
}
var http = new Http()
export default http;
