import mongoose from 'mongoose';
import { Service, Environment, Config } from './schemas';
import { config } from '../../constants/configs'


export default class MongoManager {
    constructor(connectionString = config.MONGO_STORE) {
        console.log("WARNING THIS CONNECTOR IS BROKEN ON THIS VERSION DON'T USE IT ") //TODO: fix this connector and remove the message
        this.connectionString = connectionString

        mongoose.connect(this.connectionString)
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
    }

    async createService({ name, description, environments }) {
        let promises = []
        for (let environment of environments) {
            promises.push(this._createEnvironment(environment))
        }

        let newEnvironments = await Promise.all(promises)
        var service = new Service({
            name: name,
            description: description,
            environments: newEnvironments.map(env => env._id)
        })
        return service.save()
    }

    async updateConfig(serviceId, environmentName, data) {
        const service = await this._findService(serviceId, environmentName)
        let environment = await Environment.findById(service.environments[0].id).exec()
        let newConfig = new Config({
            data: data,
            version: environment.configs.length
        })
        newConfig = await newConfig.save()
        environment.configs.push(newConfig.id)
        return environment.save()
    }

    async getConfigs(serviceId, env) {
        const service = await Service
            .find({
                _id: mongoose.Types.ObjectId(serviceId)
            })
            .populate({
                path: 'environments',
                populate: {
                    path: 'configs'
                },
                match: {
                    name: env
                }
            })
            .exec()
        return {
            name: service[0].environments[0].name,
            configs: service[0].environments[0].configs
        }
    }

    async getConfig(serviceId, env) {
        const allConfigs = await this.getConfigs(serviceId, env)
        return allConfigs.configs.sort(item => item.version).slice(-1)[0].data
    }

    async getAllEnv() {
        return Service.find({})
            .populate({
                path: 'environments',
                populate: {
                    path: 'configs'
                }
            })
            .exec()
    }

    //#region privates

    async _createEnvironment({ name, config }) {
        let newConfig = await this._createConfig(config)

        let environment = new Environment({
            name: name,
            configs: [newConfig._id]
        })

        return environment.save()
    }

    async _createConfig({ data, key }) {
        let config = new Config({
            data: data,
            version: key || 0
        })
        return config.save()
    }

    async _findService(serviceId, environmentName) {
        return Service
            .findOne({
                _id: mongoose.Types.ObjectId(serviceId)
            })
            .populate({
                path: 'environments',
                match: {
                    name: environmentName
                }
            })
            .exec()
    }

    //#endregion
}