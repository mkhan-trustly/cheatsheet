# kubectl-cheatsheet

## Kubernetes manifest (deploying an application)

Creating a deployment and a service for a basic "Hello World" web application.

### Step 1: Create a Deployment Manifest

Create a file named `deployment.yaml` with the following content to define a simple Deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hello-world
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
        - name: hello-world-container
          image: nginx:latest
          ports:
            - containerPort: 80
```

Explanation:
- We define a `Deployment` named `hello-world-deployment` with 3 replicas.
- The `selector` and `template` sections define the labels used to identify and match pods.
- The `containers` section specifies the container named `hello-world-container` using the `nginx:latest` image, running on port 80.

### Step 2: Create a Service Manifest

Create a file named `service.yaml` with the following content to define a Service:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-world-service
spec:
  selector:
    app: hello-world
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

Explanation:
- We define a `Service` named `hello-world-service` that selects pods with the label `app: hello-world`.
- The `ports` section defines how the service should route traffic to the pods, using port 80.

### Step 3: Apply the Manifests

To deploy the application to your Kubernetes cluster, apply the manifests using the `kubectl apply` command:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

Explanation:
- The `kubectl apply` command applies the configurations from the YAML files to your Kubernetes cluster.

### Step 4: Verify the Deployment

You can use various `kubectl` commands to verify the deployment:

- List deployments: `kubectl get deployments`
- List pods: `kubectl get pods`
- List services: `kubectl get services`

This example demonstrates how to create Kubernetes manifests for deploying a simple web application.

## Introduction to Kustomize

Kustomize is a powerful tool that allows you to customize and manage Kubernetes manifests in a declarative way.
It helps you avoid the need to modify base configuration files directly,
making it easier to manage variations of your applications across different environments.

With Kustomize, you can define overlays that modify or extend base resources without duplicating code.
This is especially useful for managing configurations for multiple environments, such as development, testing, and production.

Basic kustomization file, in the base
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - deployment.yaml
```

```bash
kubectl --context=<context> -n <namespace> kustomize .
kubectl --dry-run=client --context=<context> -n <namespace> apply -k .
```

## ArgoCD
ArgoCD is a declarative, GitOps continuous delivery tool that helps you manage the lifecycle of your Kubernetes applications.
It uses Git repositories as the source of truth for your application configurations,
ensuring that the desired state of your applications is always in sync with the actual state in your Kubernetes clusters.
ArgoCD automates the process of deploying, updating, and managing applications,
making it easier to achieve continuous deployment and configuration consistency.

## How to?

- Increase resource limit for an application and verify it.
- List all cronjob, find the ones that are disabled.
- Disable a cronjob (by applying a patch).
- Trigger a cronjob manually.
- Create a new sealed-secret file.
- Add a new secret in the sealed-secrets.
- Find the default user in a container.
- Restart application using rollout,
- Find memory usage for a pod

<details>
  <summary><i>Need help with kubectl commands?</i></summary>

    kubectl config use-context <context-name>

    #pods
    kubectl --context=<context-name> -n <namespace> get pods
	kubectl -n <namespace> describe pods <pod-name>
    kubectl --context=<context-name> -n <namespace> get pods | grep 'appA\|appB'

    #pods - selector
    kubectl --context=<context> -n <namespace> get pods --selector="team=x" -w

    #deployment
    kubectl --context=<context-name> get deployment <deployment-name> -o yaml | grep resources | jq ."spec"."template"."spec"
    kubectl --context=<context-name> get deployment checkout -o yaml

    #port-forwarding
    kubectl --context=<context-name> -n <namespace> port-forward svc/hazelcast-management-center 8080
    kubectl --context=<context-name> -n <namespace> port-forward svc/<service> 8081:80

    #logs
    kubectl --context=<context-name> -n <namespace> logs <pod-name>
    kubectl --context=<context-name> -n <namespace> logs -f deployment/<deployment-name> --all-containers=true --since=20m

    kubectl get events -n <namespace> --sort-by='.metadata.creationTimestamp'

    kubectl --context=<context-name> delete service cpc -n <namespace>

    #scaling, restart
    kubectl -n <namespace> rollout restart deployment/<deployment-name>
    kubectl -n <namespace> scale deployment/<deployment-name> --replicas=0 

    #cronjob
    kubectl --context=<context-name> get cronjobs
    kubectl --context=<context-name> create job --from=cronjob/<cronjob-name> manual-<x-name>-001
    kubectl --context=<context-name> delete job manual-<x-name>-001
    kubectl --context=<context-name> -n <namespace> describe cronjob <name>
    kubectl --context=<context-name> -n <namespace> get cronjob <name> -o yaml
    
    #patch	
    kubectl patch cronjobs hello -p '{"spec" : {"suspend" : false }}'
    kubectl --context=<context-name> -n <namespace> set image cronjob/<name> ...
    kubectl --context=<context-name> -n <namespace> patch cronjob <name> --type='json' 
        -p='[{"op": "replace", "path": "/spec/jobTemplate/spec/template/spec/containers/0/image", "value":<version>}]'
    
    #jobs	
    kubectl get jobs
    kubectl get jobs | grep '0/1' | wc -l
    kubectl get jobs | grep '0/1' | awk '{ print $1 }' | xargs kubectl delete job
    kubectl --context=<context-name> -n <namespace> get jobs | grep '1/1'
    kubectl --context=<context-name> -n <namespace> describe job <pod-name>
    kubectl --context=<context-name> -n <namespace> logs <pod-name>

    #exec
    kubectl exec -it [pod] -n delivery -- /bin/sh
    kubectl exec -it [pod] -n delivery -- ls -la /tmp
    kubectl cp -n delivery [pod]:/tmp/something ~/tmp/something
    kubectl --context=support exec -it $1 -n <namespace> -- cat workspace/data/<something>.json

    #configmaps
    kubectl --context=<context-name> -n <namespace> get configmaps
    kubectl get configmap <x>-configmap -o yaml -n <namespace>
    kubectl --context=<context-name> -n <namespace> get configmaps <x>-configmap -o yaml
    kubectl --context=<context-name> -n <namespace> get configmaps <x>-configmap -o yaml

    #resources
    kubectl --context=<context-name> get resources

    #secrets
	kubectl get secrets -n <namespace>
    kubectl get secret <x>-secret -n <namespace> -o yaml
    kubectl get secret rabbitmq-default-user -n <namespace> -o yaml
    kubectl --context=<context-name> -n <namespace> get secret <x>-secret -o yaml
    kubectl --context=<context-name> -n <namespace> get secret <x>-secret --show-managed-fields -o 
        jsonpath='{range .metadata.managedFields[*]}{.manager}{" did "}{.operation}{" at "}{.time}{"\n"}{end}'
	kubectl get secret <x>-secret -o json | jq '.data|map_values(@base64d)'	
	kubeseal --controller-name=sealed-secrets-controller --controller-namespace=sealed-secrets --secret-file my-secret.yaml 
        --sealed-secret-file my-sealed-secret.yaml -o json	

    #service
    kubectl get services -n <namespace>
    kubectl --context=<context-name> -n <namespace> describe svc <service-name>
    
    #environment
    kubectl exec -it <pod> -- env
    
    #routes
    kubectl --context=<context-name> get routes

    #replicaset	
    kubectl --context=<context-name> -n <namespace> get replicaset
    kubectl --context=<context-name> -n <namespace> describe replicaset hazelcast-management-center-765d5d9984

    #all	
    kubectl --context=<context-name> get all
    kubectl --context=<context-name> get route.route.openshift.io
    kubectl --context=<context-name> get route.route.openshift.io | grep cpc

    #whoami	
    kubectl --context=<context-name> -n <namespace> exec -it <pod-754f9df8d-2nq7z> -- whoami
    
    #dry-run
    kubectl --dry-run=client --context=<context-name> apply -k <deployment>
    
    # override	
    name: INTEGRATIONS_X_BASE-URL
	value: http://some-url	
	name: CLIENT_X_BASE_URL	
	value: http://some-url/

    Change deployment.yaml
    - name: X_FEATURES_SOMETHING
      value: "true"
    
    >> apply 
    bt1/sales - (master) > kubectl --context=<context-name> -n <namespace> apply -k <deployment-name>

    #top
    kubectl --context=<context-name> top pod <pod>

    #cronjob troubleshooting
    kubectl --context=<context-name> -n <namespace> get cronjobs
    kubectl --context=<context-name> -n <namespace> create job --from=cronjob/<job> manual-<job>-001 (some running no. 001)
    kubectl --context=<context-name> -n <namespace> get pods | grep <deployment>
    kubectl --context=<context-name> -n <namespace> describe pod manual-<job>-cfsp9
    kubectl --context=<context-name> -n <namespace> logs manual->pod>-003-xf2rp
    kubectl --context=<context-name> -n <namespace> get configmaps <x>-configmap -o yaml
    kubectl --context=<context-name> -n <namespace> exec -it manual-<pod>-007-8q7lw -- bash

    kubectl --context=<context-name> delete job manual-<job>-001

    kubectl --context=<context-name> -n <namespace> set image cronjob/<name> ...
    kubectl --context=<context-name> -n <namespace> patch cronjob <job> --type='json' 
        -p='[{"op": "replace", "path": "/spec/jobTemplate/spec/template/spec/containers/0/image", "value":<version>}]'
    
    #update image
    kubectl -n <namespace> patch deployment <deployment-name> 
        -p '{"spec":{"template":{"spec":{"containers":[{"name":<name>,"image":<new-image>}]}}}}'

    #rabbitmq
    kubectl --context sales-prd -n <namespace> port-forward svc/rabbitmq 15672
    kubectl scale statefulsets rabbitmq-server --replicas=1
    kubectl get statefulsets
    kubectl exec -it rabbitmq-server-0
    # channel_max = 16 can be set and other properties https://www.rabbitmq.com/docs/memory
    
    kubectl --context=<context> -n <namespace> get secret rabbitmq-default-user -o json | jq '.data|map_values(@base64d)'
    kubectl patch pv rabbitmq-1 -p '{"spec":{"claimRef": null}}'
    
    kubectl --context=<context> get pods -n <namespace> | grep rabbit
    kubectl --context=<context> -n <namespace> get pv
    kubectl --context=<context> -n <namespace> get pvc

</details>

## Other misc. help

Analyze image using dive, very helpful when working with docker images
```bash
dive <application-x>:0.0.1-b15
```