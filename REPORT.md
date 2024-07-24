2. A short report in the `REPORT.md` file detailing the steps taken to set up the local Kubernetes environment and deploy the services.
3. Answer for followup questions below in the `REPORT.md` file (see below)

2. Since i'm using Windows, instead of K3S, i installed Minikube for Kubernetes and i have Docker Desktop for creating the image. These were my steps after installing these tools.
  - Built a docker image using the Dockerfiles in the backend and frontend directories, pushed them to Dockerhub.
  - In order to generate the manifest quicker, i created a basic helm chart with a simple Deploy and Service
  - In the backends Deployment manifest i defined the backend image i created earlier, also added the environment variables, from the docker-compose, defined the 8080 as the Port and the Target Port
  - Created and HPA for the backend
  - Prepared another helm chart for the frontend and setup the image in the deployment and the port on the service as well.
  - It's a local deployment, so i didnt use any loadbalancer or ingress, i tested the services with Port forwarding (kubectl port-forward svc/coding-challenge-frontend 3000, kubectl port-forward svc/coding-challenge 8080)

  -  The helm chart, manifest and the screenshots are in the result directory.

  1. **CI/CD**
   - How would you set up a basic CI/CD pipeline to build, test, and deploy the microservices to the remote Kubernetes cluster?
     CI: I prefer Github actions for this part, first i would use some Docker Builder (a custom or a pre-created one on the marketplace)
         Before pushing them to the Artifactory i would run the unit tests, a Code Quality scanner like SonarQube, Maybe an SCA Scanner, like Xray or Veracode. Run the tests prepared by the QA colleagues, after these steps, pushing them to the Artifactory with a pre-defined naming convention (e.g. my-image:{branch}-{commit-hash}). 
         Keep the helm chart in the same repo, and refresh image version tag in the values.yaml file. 
         Create a Git Tag for the new commit
     CD:
        For the deployment, i would use Argo CD and prepare a different Repo for the ArgoCD Application manifests and environment specific configurations (values.yaml override). Create one ArgoCD app manifest for each enviroments, when we deploy to higher environment, we might just need to replace the Checkout to the newly created tag. This can be also controlled by a pipeline.
        Synch the App in the ArcoCD if autosync is not enabled

   - What deployment strategy would you recommend for deploying updates to the microservices in the Kubernetes cluster, and how would you implement it in the CI/CD pipeline?
     For frontend web applications i recommend Blue-Green deployment, because it's easy to switch over and easy to roll back if there's any issue. This can be easily done with Istio, using Virtual Services. You can control the traffic between different deployments on the same host

     For backend, i recommend Canary, because just a subset of users will be affected by the new change. This can be also done with Istio Virtual Service. If you control the traffic with it, you can define the weight as well, so the users will be distributed based on the weighted percentage. The canary promotion/rollback can be also automated with Flagger.

2. **Metrics**:
   - What tools or platforms do you use for collecting and visualizing metrics in a Kubernetes environment?
     For visualization, we are using Newrelic. We are collecting these metrics with NRs Kubernetes Adapter.

   - What are some key metrics you would monitor for a Kubernetes cluster and why?
     If the entire cluster is running on our infrastructure, i would monitor health of components in the master node, like API server, scheduler, component manager. In case of a managed cluster (EKS, GKS) only the Kubelet. These ones are crucial to run the cluster properly. I would monitor the CPU and memory usage of the worker nodes. If we use any autoscaler we can configure it according to these metrics. Events, Pod statuses. Newrelic has a very good dashboard for checking these metrics.

3. **Logging**:
   - Describe your approach to centralized logging in a Kubernetes environment.
     For collecting the logs i would use Filebeat. It's a daemonset which polls the log files of the worker nodes (where the pod logs are getting written) and sends them over for further processing.
   - What tools do you prefer for log aggregation and analysis, and why?
     For log processing we are using Logstash, it processes the logs recieved from the Filebeat and sends it over to Newrelic. Maybe works even better with Elastic Search. In the logstash you can define your rules for log processing (agregation, parsing etc.). I only have experience in Newrelic, but i like it, because it's not only a tool for checking the logs, it provides monitoring solutions for various technologies and you can search and analyze using a SQL Like language.

4. **Monitoring**:
   - What is your process for setting up monitoring alerts in Kubernetes?
     I would use the Prometheus Alert Manager. Most of the services has endpoints with Prometheus metrics. With these ones you can easily create alerts and integrate it to MS Teams or Pagerduty etc.
   - How do you ensure high availability and fault tolerance in your monitoring setup?