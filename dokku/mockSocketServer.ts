import net from 'net';
import { DOKKU_SOCKET_PATH } from '../constants/constants';

function getCommand(msg: Buffer): string {
  return msg
    .toString('utf-8')
    .replace(/--[a-z]+\s/g, '')
    .split(' ')[0];
}

net
  .createServer()
  .on('connection', (stream) => {
    stream.on('data', (msg) => {
      const command = getCommand(msg);
      switch (command) {
        case 'apps:list':
          stream.write('{"ok":true,"output":"demo-app\nnew-app"}');
          break;
        case 'storage:list':
          stream.write(
            '{"ok":true,"output":"/var/lib/dokku/data/storage/gr20-discourse/log/var-log:/var/log\n/var/lib/dokku/data/storage/gr20-discourse:/shared"}'
          );
          break;
        case 'domains:report':
          stream.write(
            '{"ok":true,"output":"Domains app enabled:           true\nDomains app vhosts:            forum.thegr20.com\nDomains global enabled:        true\nDomains global vhosts:         dokku.proxima-web.com"}'
          );
          break;
        case 'network:report':
          stream.write(
            '{"ok":true,"output":"Network attach post create: network1\n       Network attach post deploy: network2\n       Network bind all interfaces:   false\n       Network web listeners:         172.17.0.5:5000"}'
          );
          break;
        case 'proxy:ports':
          stream.write(
            '{"ok":true,"output":"http   80   80\n          https  443  80"}'
          );
          break;
        case 'proxy:report':
          stream.write(
            '{"ok":true,"output":"Proxy enabled:                 true\n          Proxy port map:                http:80:80 https:443:80\n          Proxy type:                    nginx"}'
          );
          break;
        case 'ps:inspect': {
          const output =
            '[{"AppArmorProfile":"docker-default","Args":[],"Config":{"AttachStderr":true,"AttachStdin":false,"AttachStdout":true,"Cmd":null,"Domainname":"","Entrypoint":["/sbin/boot"],"Env":["DISCOURSE_DB_HOST=XXXXXX","DOKKU_LETSENCRYPT_EMAIL=willis.rh@gmail.com","DOKKU_PROXY_PORT=80","DOKKU_PROXY_SSL_PORT=443","RUBY_GLOBAL_METHOD_CACHE_SIZE=XXXXXX","DISCOURSE_DB_SOCKET=XXXXXX","DOKKU_APP_RESTORE=0","DOKKU_PROXY_PORT_MAP=http:80:80 https:443:80","LANG=XXXXXX","RAILS_ENV=XXXXXX","UNICORN_WORKERS=XXXXXX","PORT=5000","DISCOURSE_DB_PORT=XXXXXX","DISCOURSE_HOSTNAME=XXXXXX","DISCOURSE_SMTP_PORT=XXXXXX","DISCOURSE_SMTP_USER_NAME=XXXXXX","RUBY_GC_HEAP_INIT_SLOTS=XXXXXX","UNICORN_SIDEKIQS=XXXXXX","DYNO=web.1","DISCOURSE_DEFAULT_LOCALE=XXXXXX","DISCOURSE_DEVELOPER_EMAILS=XXXXXX","DISCOURSE_SMTP_ADDRESS=XXXXXX","DISCOURSE_SMTP_PASSWORD=XXXXXX","DOCKER_HOST_IP=172.17.0.1","RUBY_GC_HEAP_GROWTH_MAX_SLOTS=XXXXXX","RUBY_GC_HEAP_OLDOBJECT_LIMIT_FACTOR=XXXXXX","PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","PG_MAJOR=XXXXXX","RUBY_ALLOCATOR=XXXXXX","LC_ALL=XXXXXX","LANGUAGE=XXXXXX"],"Hostname":"dokku-discourse","Image":"dokku/gr20-discourse:latest","Labels":{"com.dokku.app-name":"gr20-discourse","com.dokku.container-type":"deploy","com.dokku.dyno":"web.1","com.dokku.image-stage":"release","com.dokku.process-type":"web","dokku":"","org.label-schema.schema-version":"1.0","org.label-schema.vendor":"dokku"},"MacAddress":"02:ad:0f:00:32:31","OnBuild":null,"OpenStdin":false,"StdinOnce":false,"Tty":false,"User":"","Volumes":null,"WorkingDir":""},"Created":"2020-11-10T09:50:48.486014015Z","Driver":"overlay2","ExecIDs":null,"GraphDriver":{"Data":{"LowerDir":"/var/lib/docker/overlay2/08390e01bad31ddc363fcc7e09e9bd407f10c56e12ca416976cbaee73b9670c8-init/diff:/var/lib/docker/overlay2/047a7da998d550db37d3dfb218eac918822123972069d35d4c4ba82792e374f2/diff:/var/lib/docker/overlay2/a031adfb0c37c111b053fac999f5f7c3ad61c458c2ff27648499712cb3463b69/diff:/var/lib/docker/overlay2/62ccc4e1a24c96a0492a83fc0f4aa5b844cef2d5f33d6a8b197aa8c85f2306e3/diff","MergedDir":"/var/lib/docker/overlay2/08390e01bad31ddc363fcc7e09e9bd407f10c56e12ca416976cbaee73b9670c8/merged","UpperDir":"/var/lib/docker/overlay2/08390e01bad31ddc363fcc7e09e9bd407f10c56e12ca416976cbaee73b9670c8/diff","WorkDir":"/var/lib/docker/overlay2/08390e01bad31ddc363fcc7e09e9bd407f10c56e12ca416976cbaee73b9670c8/work"},"Name":"overlay2"},"HostConfig":{"AutoRemove":false,"Binds":["/var/lib/dokku/data/storage/gr20-discourse/log/var-log:/var/log","/var/lib/dokku/data/storage/gr20-discourse:/shared"],"BlkioDeviceReadBps":null,"BlkioDeviceReadIOps":null,"BlkioDeviceWriteBps":null,"BlkioDeviceWriteIOps":null,"BlkioWeight":0,"BlkioWeightDevice":[],"CapAdd":null,"CapDrop":null,"Capabilities":null,"Cgroup":"","CgroupParent":"","ConsoleSize":[0,0],"ContainerIDFile":"","CpuCount":0,"CpuPercent":0,"CpuPeriod":0,"CpuQuota":0,"CpuRealtimePeriod":0,"CpuRealtimeRuntime":0,"CpuShares":0,"CpusetCpus":"","CpusetMems":"","DeviceCgroupRules":null,"DeviceRequests":null,"Devices":[],"Dns":[],"DnsOptions":[],"DnsSearch":[],"ExtraHosts":null,"GroupAdd":null,"IOMaximumBandwidth":0,"IOMaximumIOps":0,"Init":true,"IpcMode":"private","Isolation":"","KernelMemory":0,"KernelMemoryTCP":0,"Links":null,"LogConfig":{"Config":{},"Type":"json-file"},"MaskedPaths":["/proc/asound","/proc/acpi","/proc/kcore","/proc/keys","/proc/latency_stats","/proc/timer_list","/proc/timer_stats","/proc/sched_debug","/proc/scsi","/sys/firmware"],"Memory":0,"MemoryReservation":0,"MemorySwap":0,"MemorySwappiness":null,"NanoCpus":0,"NetworkMode":"default","OomKillDisable":false,"OomScoreAdj":0,"PidMode":"","PidsLimit":null,"PortBindings":{},"Privileged":false,"PublishAllPorts":false,"ReadonlyPaths":["/proc/bus","/proc/fs","/proc/irq","/proc/sys","/proc/sysrq-trigger"],"ReadonlyRootfs":false,"RestartPolicy":{"MaximumRetryCount":0,"Name":"always"},"Runtime":"runc","SecurityOpt":null,"ShmSize":536870912,"UTSMode":"","Ulimits":null,"UsernsMode":"","VolumeDriver":"","VolumesFrom":null},"HostnamePath":"/var/lib/docker/containers/7207b59272113e663c27d05957afa80b29ca0cc79509c544783efe4ac57e4ded/hostname","HostsPath":"/var/lib/docker/containers/7207b59272113e663c27d05957afa80b29ca0cc79509c544783efe4ac57e4ded/hosts","Id":"7207b59272113e663c27d05957afa80b29ca0cc79509c544783efe4ac57e4ded","Image":"sha256:ccc09f2e1d6692975c6b06b2964183198daa26077f0775709aa9b35a5da4bd7f","LogPath":"/var/lib/docker/containers/7207b59272113e663c27d05957afa80b29ca0cc79509c544783efe4ac57e4ded/7207b59272113e663c27d05957afa80b29ca0cc79509c544783efe4ac57e4ded-json.log","MountLabel":"","Mounts":[{"Destination":"/var/log","Mode":"","Propagation":"rprivate","RW":true,"Source":"/var/lib/dokku/data/storage/gr20-discourse/log/var-log","Type":"bind"},{"Destination":"/shared","Mode":"","Propagation":"rprivate","RW":true,"Source":"/var/lib/dokku/data/storage/gr20-discourse","Type":"bind"}],"Name":"/gr20-discourse.web.1","NetworkSettings":{"Bridge":"","EndpointID":"3df90bbd73c2d44c3e8602c673280e8793f6d1b83487955432474e370d83fb91","Gateway":"172.17.0.1","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"HairpinMode":false,"IPAddress":"172.17.0.5","IPPrefixLen":16,"IPv6Gateway":"","LinkLocalIPv6Address":"","LinkLocalIPv6PrefixLen":0,"MacAddress":"02:ad:0f:00:32:31","Networks":{"bridge":{"Aliases":null,"DriverOpts":null,"EndpointID":"3df90bbd73c2d44c3e8602c673280e8793f6d1b83487955432474e370d83fb91","Gateway":"172.17.0.1","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"IPAMConfig":null,"IPAddress":"172.17.0.5","IPPrefixLen":16,"IPv6Gateway":"","Links":null,"MacAddress":"02:ad:0f:00:32:31","NetworkID":"f44f3d802889f0d0b9217a66053e36e77379d102a7f5af3fd394105bcdee0eef"}},"Ports":{},"SandboxID":"4d875df8dfbed0083f961e65c3621469ca69c9ff01fd5df77ca8159d149a7158","SandboxKey":"/var/run/docker/netns/4d875df8dfbe","SecondaryIPAddresses":null,"SecondaryIPv6Addresses":null},"Path":"/sbin/boot","Platform":"linux","ProcessLabel":"","ResolvConfPath":"/var/lib/docker/containers/7207b59272113e663c27d05957afa80b29ca0cc79509c544783efe4ac57e4ded/resolv.conf","RestartCount":0,"State":{"Dead":false,"Error":"","ExitCode":0,"FinishedAt":"0001-01-01T00:00:00Z","OOMKilled":false,"Paused":false,"Pid":2275239,"Restarting":false,"Running":true,"StartedAt":"2020-11-10T09:50:49.200805531Z","Status":"running"}}]';
          const response = `{"ok":true,"output":${JSON.stringify(
            JSON.stringify(JSON.parse(output))
          )}}`;
          stream.write(response);
          break;
        }
        default:
          stream.write(
            `{"ok":false,"output":"Command '${command}' not mocked"}`
          );
      }
    });
  })
  .listen(DOKKU_SOCKET_PATH, () => {
    console.log('Server bound to socket at path:', DOKKU_SOCKET_PATH);
  });
