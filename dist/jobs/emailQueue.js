"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
class InMemoryQueue extends EventEmitter {
    jobs = [];
    processing = false;
    concurrency;
    retryAttempts;
    retryDelay;
    constructor(options = {}) {
        super();
        this.concurrency = options.concurrency || 2;
        this.retryAttempts = options.retryAttempts || 3;
        this.retryDelay = options.retryDelay || 3000;
    }
    async add(jobFn) {
        const job = {
            id: Date.now() + Math.random(),
            jobFn,
            attempts: 0,
            status: "waiting"
        };
        this.jobs.push(job);
        if (!this.processing) {
            this._process();
        }
        return job;
    }
    async _process() {
        this.processing = true;
        while (this.jobs.length > 0) {
            const batch = this.jobs.splice(0, this.concurrency);
            await Promise.allSettled(batch.map((job) => this._processJob(job)));
        }
        this.processing = false;
    }
    async _processJob(job) {
        job.attempts++;
        try {
            await job.jobFn();
            job.status = "completed";
            this.emit("completed", job);
        }
        catch (err) {
            if (job.attempts < this.retryAttempts) {
                job.status = "retry";
                console.log(`Retrying job ${job.id} attempt ${job.attempts}`);
                setTimeout(() => {
                    this.jobs.push(job);
                    if (!this.processing)
                        this._process();
                }, this.retryDelay);
            }
            else {
                job.status = "failed";
                this.emit("failed", job, err);
            }
        }
    }
}
const emailQueue = new InMemoryQueue({
    concurrency: 1,
    retryAttempts: 3,
    retryDelay: 5000
});
emailQueue.on("completed", (job) => {
    console.log("Email job completed:", job.id);
});
emailQueue.on("failed", (job, err) => {
    console.error("Email job failed:", job.id, err.message);
});
module.exports = emailQueue;
