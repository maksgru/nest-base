void runPipeLine() {
    pipeline {
        agent { dockerfile true }
        stages {
            runBuild()
            environment { NODE_ENV = 'test' }
            runTestUnit()
        }
    }
}

void runBuild() {
    stage('Build') {
        steps {
            sh 'yarn install --frozen-lockfile'
        }
    }
}

void runTestUnit() {
    stage('test:unit') {
        steps {
            sh 'yarn test:unit'
        }
    }
}

runPipeLine()
