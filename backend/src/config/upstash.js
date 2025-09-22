//configuracao do middleware para conectar com o banco upstash, afim de ter um rate limiting na aplicacao
import {Redis} from "@upstash/redis";
import {Ratelimit} from "@upstash/ratelimit";
import "dotenv/config";

const connectionRateLimite = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(40, "60 s"), //10 requests per 1 minute
});

export default connectionRateLimite;