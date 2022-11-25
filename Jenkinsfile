node {
    cleanWs()
    checkout scm
    runTestUnit()
}

void runTestUnit() {
    env.NODE_ENV = 'test'
    docker.build("my-image:${env.BUILD_ID}", "-f Dockerfile . --pull")
    stage('test:unit') {
        sh 'yarn test:unit'
    }
}
