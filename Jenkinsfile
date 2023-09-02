// pipeline {
//     agent any

//     environment {
//         DOCKERHUB_CREDENTIALS = credentials('docker_login')
//         DOCKERHUB_REPO = 'divanshreevatsa/jenkins_test_docker'
//     }

//     stages {
//         stage('Build and Push Backend') {
//             steps {
//                 dir('backend') {
//                     checkout scm
//                     script {
//                         def imageTag = "backend-${BUILD_NUMBER}"
//                         sh "docker build -t ${DOCKERHUB_REPO}:${imageTag} ."
//                         sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
//                         sh "docker push ${DOCKERHUB_REPO}:${imageTag}"
//                     }
//                 }
//             }
//         }

//         stage('Build and Push Frontend') {
//             steps {
//                 dir('frontend') {
//                     checkout scm
//                     script {
//                         def imageTag = "frontend-${BUILD_NUMBER}"
//                         sh "docker build -t ${DOCKERHUB_REPO}:${imageTag} ."
//                         sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
//                         sh "docker push ${DOCKERHUB_REPO}:${imageTag}"
//                     }
//                 }
//             }
//         }

//         stage('Deploy with Docker Compose') {
//             steps {
//                 script {
//                     def backendImageTag = "backend-${BUILD_NUMBER}"
//                     def frontendImageTag = "frontend-${BUILD_NUMBER}"
//                     sh "docker-compose pull" // Pull the latest images from Docker Hub
//                     sh "docker-compose up -d" // Run the containers
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             sh 'docker logout'
//         }
//     }
// }
// pipeline {
//     agent any

//     environment {
//         DOCKER_HUB_CREDENTIALS = credentials('docker_login') // Add your Jenkins credential ID here
//     }

//     stages {
//         stage('Build and Push Backend Image') {
//             steps {
//                 dir('backend') {
//                     script {
//                         def backendImage = docker.build("divanshreevatsa/backend-image:latest", "-f Dockerfile .")
//                         docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
//                             backendImage.push()
//                         }
//                     }
//                 }
//             }
//         }
        
//         stage('Build and Push Frontend Image') {
//             steps {
//                 dir('frontend') {
//                     script {
//                         def frontendImage = docker.build("divanshreevatsa/frontend-image:latest", "-f Dockerfile .")
//                         docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
//                             frontendImage.push()
//                         }
//                     }
//                 }
//             }
//         }
        
//         stage('Pull and Run Images') {
//             steps {
//                 script {
//                     docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
//                         docker.image("divanshreevatsa/backend-image:latest").pull()
//                         docker.image("divanshreevatsa/frontend-image:latest").pull()
//                     }
                    
//                     docker.run("-p 5000:5000 -d divanshreevatsa/backend-image:latest")
//                     docker.run("-p 3000:3000 -d divanshreevatsa/frontend-image:latest")
//                 }
//             }
//         }
//     }
// }
// pipeline {
//     agent any

//     environment {
//         DOCKER_HUB_CREDENTIALS = credentials('docker_login') // Add your Jenkins credential ID here
//     }

//     stages {
//         stage('Build and Push Docker Compose Images') {
//             steps {
//                 script {
//                     // Build and push Docker Compose images
//                     sh 'docker-compose build'
//                     docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
//                         sh 'docker-compose push'
//                     }
//                 }
//             }
//         }
        
//         stage('Pull and Run Docker Compose Images') {
//             steps {
//                 script {
//                     // Pull and run Docker Compose images
//                     sh 'docker-compose pull'
//                     sh 'docker-compose up -d'
//                 }
//             }
//         }
//     }
// }
pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker_login')
        DOCKERHUB_REPO = 'divanshreevatsa/jenkins_test_docker'
    }

    stages {
        stage('Build and Push Docker Compose Images') {
            steps {
                script {
                    def backendImageTag = "backend-${BUILD_NUMBER}"
                    def frontendImageTag = "frontend-${BUILD_NUMBER}"
                    
                    // Build backend and frontend images
                    dir('backend') {
                        sh "docker build -t ${DOCKERHUB_REPO}:${backendImageTag} ."
                    }
                    // Authenticate and push images
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    sh "docker push ${DOCKERHUB_REPO}:${backendImageTag}"
                    
                    dir('frontend') {
                        sh "docker build -t ${DOCKERHUB_REPO}:${frontendImageTag} ."
                    }
                    
                   
                    sh "docker push ${DOCKERHUB_REPO}:${frontendImageTag}"
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Pull and run Docker Compose images
                    sh "docker-compose pull" // Pull the latest images from Docker Hub
                    sh "docker-compose up -d" // Run the containers
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}

