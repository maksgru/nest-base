// node {
//     cleanWs()
//     checkout scm
//     stage('test') {
//         def dockerImage = docker.build("my-image:${env.BUILD_ID}", "-f Dockerfile .")
//         dockerImage.inside {
//             sh 'yarn install'
//             sh 'yarn test:unit'
//         }
//     }
// }

class BasePipeline {
    def dockerImage

    BasePipeline() {
        node {
            cleanWs()
            checkout scm
        }
    }

    void buildDockerImage() {
        this.dockerImage = docker.build("my-image:${env.BUILD_ID}", "-f Dockerfile .")
    }

    void runTestUnit(String command) {
        String shCommand = command ? command : 'npm run test:unit'

        this.dockerImage.inside {
            stage('test:unit') {
                sh "$shCommand"
            }
        }
    }
}

basePipeline = new BasePipeline()

basePipeline.buildDockerImage()
basePipeline.runTestUnit()