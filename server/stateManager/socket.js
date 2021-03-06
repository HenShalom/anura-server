import { getRoomName } from './helperFunctions'
import { ROOM_ID_PREFIX, CONFIG_CHANGE_EVENT } from '../constants/constants'
import { initializePubsub } from './pubsub'
import logger from '../utils/logger'

class StateManager {
    constructor(io, costumeLogger = logger) {
        this.logger = costumeLogger
        this.io = io
        this.startUp()
    }
    startUp() {
        this.logger.log({ message: "StateManager: Initialize ", level: "info" })
        const logger = this.logger
        this.io.on('connection', function (socket) {
            const { serviceName, environment } = socket.request._query;
            logger.log({ message: `StateManager: connect serviceName:${serviceName}, environment:${environment}`, level: "info" })
            const roomName = getRoomName(serviceName, environment)
            socket.join(roomName)
        });
    }
    emitChange(serviceName, environment) {
        this.logger.log({ message: `StateManager: emit change on serviceName:${serviceName},environment:${environment} `, level: "info" })
        const roomName = getRoomName(serviceName, environment)
        this.io.to(roomName).emit(CONFIG_CHANGE_EVENT);
    }
    getAllActiveRoom() {
        const roomKeys = Object.keys(this.io.sockets.adapter.rooms)
            .filter(i => i.startsWith(ROOM_ID_PREFIX))
        return roomKeys.map(key => ({
            room: key,
            length: this.io.sockets.adapter.rooms[key].length
        }))
    }
}

let stateManager;

export function initializeSocket(io) {
    initializePubsub(io)
    if (stateManager === undefined) {
        stateManager = new StateManager(io)
        return stateManager
    }
    throw new Error("already initialize")
}

export function getStateManager() {
    return stateManager
}