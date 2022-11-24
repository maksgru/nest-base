def runPipeLine() {
    return pipeline {
        agent { dockerfile true }
        stages {
            runBuild()
            environment { NODE_ENV = 'test' }
            runTestUnit()
        }
    }
}

def runBuild() {
    return stage('Build') {
        steps {
            sh 'yarn install --frozen-lockfile'
        }
    }
}

def runTestUnit() {
    return stage('test:unit') {
        steps {
            sh 'yarn test:unit'
        }
    }
}

runPipeLine()
