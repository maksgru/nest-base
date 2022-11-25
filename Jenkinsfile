node {
    cleanWs()
    image = docker.build("my-image:${env.BUILD_ID}", "-f Dockerfile .")
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
