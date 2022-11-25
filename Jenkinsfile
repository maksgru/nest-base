node {
    cleanWs()
    checkout scm
    runTestUnit()
}

void runTestUnit() {
    stage('test:unit') {
        env.NODE_ENV = 'test'
        docker.image("my-image:${env.BUILD_ID}", "-f Dockerfile .")
        sh 'yarn test:unit'
    }
}
