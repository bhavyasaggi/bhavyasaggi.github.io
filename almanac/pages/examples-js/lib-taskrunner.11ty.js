module.exports = `
/**
 *
 * TaskRunner
 *
 * Perform given tasks sequentially
 *
 * 1. retry
 * 2. timeout
 * 3. concurrency
 *
 */

 const timeoutSymbol = { status: 'timeout' }

 function Task(task, { retry, timeout }) {
   this.status = 0
   this.cancelled = 0
   this.task = task
   this.retry = retry || 0
   this.timeout = timeout || 0
 }
 Task.prototype.exec = function () {
   const { task, retry, timeout } = this
   let taskPromise = Promise.resolve().then(() => {
     if (!this.cancelled) {
       return task()
     }
   })
   for (let rIdx = 0; rIdx < retry; rIdx += 1) {
     taskPromise = taskPromise.catch(() => {
       if (!this.cancelled) {
         return task()
       }
     })
   }
   const racePromiseArray = [taskPromise]
   if (timeout) {
     racePromiseArray.push(
       new Promise((resolve, reject) =>
         setTimeout(reject, timeout, timeoutSymbol)
       )
     )
   }
   this.status = 1
   return Promise.race(racePromiseArray)
     .catch((err) => {
       if (err === timeoutSymbol) {
         this.cancelled = 1
       }
     })
     .then(() => {
       this.status = 2
     })
 }

 function TaskRunner() {
   this.status = 0 // 0: Idle, 1: Running
   this.taskQueue = []
 }
 TaskRunner.prototype.add = function (task) {
   this.taskQueue.push(task)
   return this
 }
 TaskRunner.prototype.exec = function (concurrency = 1) {
   this.status = 1
   return Promise.all(
     this.taskQueue.splice(0, concurrency).map((task) => task.exec())
   ).then(() => {
     if (this.taskQueue.length) {
       return this.exec()
     } else {
       this.status = 0
     }
   })
 }

 const taskRunner = new TaskRunner()

 const task1 = new Task(
   function () {
     console.log('RUNNING 1!')
     return new Promise((resolve, reject) =>
       setTimeout(reject, 5000, new Error('REJECT 1'))
     ).then(() => {
       console.log('STOP 1!')
     })
   },
   { timeout: 3000, retry: 3 }
 )

 const task2 = new Task(
   function () {
     console.log('RUNNING 2!')
     return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
       console.log('STOP 2!')
     })
   },
   { timeout: 4000, retry: 3 }
 )

 const task3 = new Task(
   function () {
     console.log('RUNNING 3!')
     return new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
       console.log('STOP 3!')
     })
   },
   { timeout: 5000, retry: 3 }
 )

//  taskRunner.add(task1)
//  taskRunner.add(task2)
//  taskRunner.add(task3)

//  taskRunner.exec(3).then(() => {
//    console.log('FIN')
//  })

`
