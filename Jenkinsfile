node {
    cleanWs()
    checkout scm
    image = docker.build("my-image:${env.BUILD_ID}", "-f Dockerfile . --pull")
    runTestUnit()
}

void runTestUnit() {
    env.NODE_ENV = 'test'
    stage('test:unit') {
        sh 'yarn test:unit'
    }
}
