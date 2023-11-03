module.exports = `
// [a,5], [b, 2], [c, 2, ab], [d, 1, ], [e, 2, cb]
// d, b, a, c, e, all done
var tasks = {
  a: {
    job: function (finish) {
      setTimeout(function () {
        console.log('a done')
        finish()
      }, 500)
    },
  },
  b: {
    job: function (finish) {
      setTimeout(function () {
        console.log('b done')
        finish()
      }, 200)
    },
  },
  c: {
    job: function (finish) {
      setTimeout(function () {
        console.log('c done')
        finish()
      }, 200)
    },
    dependencies: ['a', 'b'],
  },
  d: {
    job: function (finish) {
      setTimeout(function () {
        console.log('d done')
        finish()
      }, 100)
    },
    dependencies: [],
  },
  e: {
    job: function (finish) {
      setTimeout(function () {
        console.log('e done')
        finish()
      }, 200)
    },
    dependencies: ['c', 'b'],
  },
}

function Task({ id, job, deps, cb }) {
  this.id = id
  this.job = job
  this.cb = cb
  this.deps = (deps || []).reduce((acc, dep) => {
    acc[dep] = 0
    return acc
  }, {})
  // -1: Error
  // 0 : Unexec
  // 1 : Running
  // 2 : Finish
  this.status = 0
}
Task.prototype.notify = function (dep) {
  if (Object.hasOwnProperty.call(this.deps, dep)) {
    this.deps[dep] = 1
  }
  this.exec()
}
Task.prototype.exec = function () {
  if (Object.values(this.deps).every((dep) => dep === 1)) {
    this.job(this.cb)
  }
}

function TaskManager(taskObject, callback) {
  this.taskMap = {}
  this.taskMapListeners = {}

  const taskIds = Object.keys(taskObject)
  taskIds.forEach((id) => {
    const task = taskObject[id]
    const taskObj = (this.taskMap[id] = new Task({
      id,
      job: task.job,
      deps: task.dependencies,
      cb: () => this.notify(id),
    }))
    const taskDeps = task.dependencies || []
    taskDeps.forEach((taskDep) => {
      this.taskMapListeners[taskDep] = this.taskMapListeners[taskDep] || []
      this.taskMapListeners[taskDep].push(taskObj)
    })
  })
  // EndTask
  const endTask = new Task({
    id: taskIds.join(''),
    job: callback,
    deps: taskIds,
    cb: () => {},
  })
  this.taskMap[endTask.id] = endTask
  taskIds.forEach((taskId) => {
    this.taskMapListeners[taskId] = this.taskMapListeners[taskId] || []
    this.taskMapListeners[taskId].push(endTask)
  })
  //   console.log(">>>", this.taskMap)
  //   console.log("###", this.taskMapListeners)
}
TaskManager.prototype.notify = function (id) {
  if (this.taskMapListeners[id]) {
    this.taskMapListeners[id]
      .splice(0, this.taskMapListeners[id].length)
      .forEach((taskObj) => {
        //         console.log("NOTIFY EVENT FOR: "+id+" TO: "+taskObj.id)
        taskObj.notify(id)
      })
  }
}
TaskManager.prototype.exec = function () {
  Object.keys(this.taskMap).forEach((id) => {
    const taskObj = this.taskMap[id]
    const taskDeps = Object.keys(taskObj ? taskObj.deps : {})
    if (taskObj && !taskDeps.length) {
      //       console.log("NOTIFY EVENT FOR: _ TO: "+taskObj.id)
      taskObj.notify()
    }
  })
}

const taskManager = new TaskManager(tasks, () => console.log('All Done'))
taskManager.exec()
`
