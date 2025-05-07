const { execSync } = require('child_process');
const moment = require('moment');

const getPodsJson = (context) => {
    try {
        const config = { encoding: 'utf8', maxBuffer: 1024 * 1024 * 100  }
        const output = execSync(`kubectl --context=${context} get pods -n <namespace> -o json`, config);
        return JSON.parse(output);
    } catch (error) {
        console.error('Error executing kubectl command:', error.message);
        process.exit(1);
    }
}

const calculatePodStartupTimes = (podsJson) => {
    console.log("Pod Name | Startup Time (s)");
    console.log("----------------------------------------");

    const podStartupTime = [];

    podsJson.items.forEach(pod => {
        const team = pod.metadata.annotations.team

        if (team !== 'my_team') {
            return;
        }

        const namespace = pod.metadata.namespace;
        const podName = pod.metadata.name;
        const creationTimestamp = pod.metadata.creationTimestamp;
        const { conditions, containerStatuses } = pod.status

        const lastRestartedTime = containerStatuses
            .filter(item => item.restartCount > 0)
            .map(item => item.state.running.startedAt)
            .sort((a, b) => moment(a).diff(b))[0]

        // Find the Ready condition
        const readyCondition = conditions.find(cond => cond.type === 'Ready' && cond.status === 'True');
        if (readyCondition) {
            const readyTimestamp = readyCondition.lastTransitionTime;

            if (lastRestartedTime) {
                console.warn(`${podName} was restarted x no. of times and the latest was at ${lastRestartedTime}`);
            }
            const creationTimeMs = lastRestartedTime ? moment(lastRestartedTime).valueOf() : moment(creationTimestamp).valueOf();
            const readyTimeMs = moment(readyTimestamp).valueOf();

            const startupTimeInSecs = (readyTimeMs - creationTimeMs) / 1000;

            podStartupTime.push(`${podName} | ${startupTimeInSecs} s`);

        } else {
            podStartupTime.push(`${podName} | Not Ready`);
        }
    });

    podStartupTime
        .forEach((item) => console.log(item))
}


const init = () => {
    const context = process.argv[2]
    console.log(`Running against ${context}`)
    const podsJson = getPodsJson(context);
    calculatePodStartupTimes(podsJson);
}
init();