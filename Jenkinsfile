node {
    cleanWs()
    checkout scm
    stage('build') {
            docker.image("my-image:${env.BUILD_ID}", "-f Dockerfile .").inside {
                withEnv(["NODE_ENV = 'test'"]) {
                    sh 'yarn test:unit'
                }
            }
        }
}
