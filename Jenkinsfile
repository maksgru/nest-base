node('dockerhost') {
    cleanWs()
    stage('build') {
        checkout scm
        env.NODE_ENV = 'test'
    }
    runTestUnit()
}

void runTestUnit() {
    stage('test:unit') {
        sh 'yarn test:unit'
    }
}
