# jilmo-auth

## Drone

[Drone Guide](https://docs.drone.io/installation/github/single-machine/)

Server:

```
docker run \
  --volume=/var/run/docker.sock:/var/run/docker.sock \
  --volume=/var/lib/drone:/data \
  --env=DRONE_GITHUB_SERVER=https://github.com \
  --env=DRONE_GITHUB_CLIENT_ID=318f86abdd91e0f6dfa9 \
  --env=DRONE_GITHUB_CLIENT_SECRET=ede6a359fdea4b137cf39144b0b2b044004e6a46 \
  --env=DRONE_RUNNER_CAPACITY=2 \
  --env=DRONE_SERVER_HOST=drone.jilmo-auth.io \
  --env=DRONE_SERVER_PROTO=https \
  --env=DRONE_TLS_AUTOCERT=true \
  --env=DRONE_RPC_SECRET=ca07cacac8f5 \
  --restart=always \
  --detach=true \
  --name=drone \
  --network=web \
  --label traefik.port=80 \
  --label traefik.frontend.rule=Host:drone.jilmo-auth.io \
  drone/drone:1
```

Agent:

```
docker run -d \
  -e DRONE_RPC_PROTO=https \
  -e DRONE_RPC_HOST=drone.jilmo-auth.io \
  -e DRONE_RPC_SECRET=ca07cacac8f5 \
  -e DRONE_RUNNER_CAPACITY=2 \
  -e DRONE_RUNNER_NAME=${HOSTNAME} \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --restart always \
  --name runner \
  --network=web \
  --label traefik.frontend.rule=Host:agent.jilmo-auth.io \
  drone/agent:1
```
