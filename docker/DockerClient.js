"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dockerClient = void 0;
const dockerode_1 = __importDefault(require("dockerode"));
const constants_1 = require("../constants/constants");
exports.dockerClient = new dockerode_1.default({ socketPath: constants_1.DOCKER_SOCKET_PATH });
