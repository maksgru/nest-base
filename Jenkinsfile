def runPipeLine() {
    pipeline {
        agent { dockerfile true }
        stages {
            runBuild()
            environment { NODE_ENV = 'test' }
            runTestUnit()
        }
    }
}

def runBuild() {
    stage('Build') {
        steps {
            sh 'yarn install --frozen-lockfile'
        }
    }
}

def runTestUnit() {
    stage('test:unit') {
        steps {
            sh 'yarn test:unit'
        }
    }
}

runPipeLine()
