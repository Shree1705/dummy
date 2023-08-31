// pipeline {
//   agent any
//   options {
//     buildDiscarder(logRotator(numToKeepStr: '5'))
//   }
//   environment {
//     DOCKERHUB_CREDENTIALS = credentials('dockerhub')
//   }
//   stages {
//     stage('Build') {
//       steps {
//         sh 'docker-compose build'
//       }
//     }
//     stage('Login') {
//       steps {
//         sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
//       }
//     }
//     stage('Push') {
//       steps {
//         script {
//           def imageName = 'lavakumar7619/hotel_ease'
//           sh "docker-compose push"
//           sh "docker tag ${imageName}:latest ${imageName}:${env.BUILD_NUMBER}"
//           sh "docker push ${imageName}:${env.BUILD_NUMBER}"
//         }
//       }
//     }
//   }
//   post {
//     always {
//       sh 'docker logout'
//     }
//   }
// }
pipeline {
    agent any
    options {
      (logRotator(numToKeepStr: '5'))
    }
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker_login')
        IMAGE_NAME = 'divanshreevatsa/jenkins_test_docker'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    // Log in to DockerHub
                    withCredentials([string(credentialsId: 'DOCKER_HUB_CREDENTIALS', variable: 'DOCKER_HUB_CREDENTIALS')]) {
                        sh "docker login -u divanshreevatsa -p \$DOCKER_HUB_CREDENTIALS"
                        sh "docker-compose push"
                    }
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    sh "docker-compose up -d"
                }
            }
        }
        post {
        always {
          sh 'docker logout'
        }
    }
}
