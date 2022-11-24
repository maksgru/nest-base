def runPipeLine() {
    return pipeline {
        agent { dockerfile true }
        stages {
            environment { NODE_ENV = 'test' }
            runBuild()
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
