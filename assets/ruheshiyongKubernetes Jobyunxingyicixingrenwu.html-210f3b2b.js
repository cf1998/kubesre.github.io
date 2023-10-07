import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, b as createBaseVNode, d as createTextVNode, e as createVNode, a as createStaticVNode } from "./app-d515af8b.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h2 id="job-概念" tabindex="-1"><a class="header-anchor" href="#job-概念" aria-hidden="true">#</a> Job 概念</h2><p>在 kubernetes 中，Deployment、DaemonSet会持续运行任务，这些 pod 中的进程在崩溃退出时会重新启动，永远达不到完成态。你也许会遇到这样的场景，当需要运行一个一次性的可完成的任务，其进程终止后，不应该再重新启动，那么 Job 资源类型完全符合你。 Kubernetes 中通过 Job 资源提供了对此的支持，它允许你运行一种 pod，该 pod 在内部进程成功结束时，不重启容器。一旦任务完成，pod 就被认为处于完成状态。 在发生节点故障时，该节点上由 Job 管理的 pod 将按照 ReplicaSet 的 pod 的方式， 重新安排到其他节点，以确保任务能够成功完成，所以 Job 通常用于执行一次性任务或批处理作业。 Job 还可以控制 Pod 的数量，确保一定数量的 Pod 成功完成任务。 Job 的一些常用使用场景：</p><ul><li>批处理作业：Job可以被用来运行需要大量计算资源的作业，例如对大量数据的处理，机器学习模型训练等。</li><li>数据处理：Job也可以用来处理大量数据，例如数据的清洗、归档和备份等。</li><li>定时任务：Job可以被用来定期执行一些任务，例如定期生成报表、定期清理数据等。</li><li>资源分配：通过Job控制器，我们可以为特定任务分配所需的计算资源，例如CPU和内存等，以保证任务能够顺利执行。</li></ul><h2 id="job-定义" tabindex="-1"><a class="header-anchor" href="#job-定义" aria-hidden="true">#</a> Job 定义</h2><p>下面是一个 Job 配置示例。它负责计算 π 到小数点后 2000 位，并将结果打印出来。 此计算大约需要 10 秒钟完成。 job.yaml：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: batch/v1\nkind: Job\nmetadata:\n  name: pi\nspec:\n  template:\n    spec:\n      containers:\n      - name: pi\n        image: perl:5.34.0\n        command: <span class="token punctuation">[</span><span class="token string">&quot;perl&quot;</span>,  <span class="token string">&quot;-Mbignum=bpi&quot;</span>, <span class="token string">&quot;-wle&quot;</span>, <span class="token string">&quot;print bpi(2000)&quot;</span><span class="token punctuation">]</span>\n      restartPolicy: Never\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建它，查看Job 、Pods 的状态： Pod 状态为 Running，说明已经在执行，Job 的 COMPLETIONS 为 0/1，表示按照预期启动了一个 Pod，还未完成。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl apply -f  job.yaml</span>\njob.batch/pi created\n \n \n<span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl get jobs,pods</span>\nNAME           COMPLETIONS   DURATION   AGE\njob.batch/pi   <span class="token number">0</span>/1           39s        39s\n \nNAME           READY   STATUS    RESTARTS   AGE\npod/pi-d5f6q   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          39s\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等待大概10s左右，发现状态已经变为 Completed 了， kubectl logs 可以查看 Pod 的标准输出：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl get jobs,pods</span>\nNAME           COMPLETIONS   DURATION   AGE\njob.batch/pi   <span class="token number">1</span>/1           43s        47s\n \nNAME           READY   STATUS      RESTARTS   AGE\npod/pi-d5f6q   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          47s\n \n \n<span class="token comment"># 查看日志</span>\n<span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl logs -f pi-d5f6q</span>\n<span class="token number">3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632788659361533818279682303019520353018529689957736225994138912497217752834791315155748572424541506959508295331168617278558890750983817546374649393192550604009277016711390098488240128583616035637076601047101819429555961989467678374494482553797747268471040475346462080466842590694912933136770289891521047521620569660240580381501935112533824300355876402474964732639141992726042699227967823547816360093417216412199245863150302861829745557067498385054945885869269956909272107975093029553211653449872027559602364806654991198818347977535663698074265425278625518184175746728909777727938000816470600161452491921732172147723501414419735685481613611573525521334757418494684385233239073941433345477624168625189835694855620992192221842725502542568876717904946016534668049886272327917860857843838279679766814541009538837863609506800642251252051173929848960841284886269456042419652850222106611863067442786220391949450471237137869609563643719172874677646575739624138908658326459958133904780275901</span>\nJob 失败处理\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="job-失败处理" tabindex="-1"><a class="header-anchor" href="#job-失败处理" aria-hidden="true">#</a> Job 失败处理</h2><p>Job 的 restart 策略只有如下两种（没有pod的策略Always）：</p><ol><li>Never：只要任务没有完成，则新创建pod运行，直到job完成，会产生多个pod。（默认）</li><li>OnFailure：只要pod没有完成，就会重启pod，重新执行任务。</li></ol><p>如果失败了会怎么样呢？ 我们故意引入一个错误，修改 job.yaml：将执行命令修改为错误的</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">..</span>.\n        command: <span class="token punctuation">[</span><span class="token string">&quot;per&quot;</span>,  <span class="token string">&quot;&quot;</span>, <span class="token string">&quot;-&quot;</span>, <span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建它，查看Job 、Pods 的状态， 当 restart 策略为 Never 时，会看到只要任务没有完成，就会新创建pod运行，直到job完成，会产生多个pod：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl apply -f  job.yaml</span>\njob.batch/pi created\n \n \n<span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl get jobs,pods</span>\nNAME           COMPLETIONS   DURATION   AGE\njob.batch/pi   <span class="token number">0</span>/1           3m14s      3m14s\n \nNAME           READY   STATUS       RESTARTS   AGE\npod/pi-9shvk   <span class="token number">0</span>/1     StartError   <span class="token number">0</span>          3m10s\npod/pi-gjwp7   <span class="token number">0</span>/1     StartError   <span class="token number">0</span>          2m\npod/pi-mp96m   <span class="token number">0</span>/1     StartError   <span class="token number">0</span>          2m40s\npod/pi-nrb64   <span class="token number">0</span>/1     StartError   <span class="token number">0</span>          3m14s\npod/pi-nznrc   <span class="token number">0</span>/1     StartError   <span class="token number">0</span>          3m\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 restart 策略为 OnFailure 时，只要pod没有完成，就会重启pod，重新执行任务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl apply -f  job.yaml</span>\njob.batch/pi created\n \n \n<span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl get jobs,pods</span>\nNAME           COMPLETIONS   DURATION   AGE\njob.batch/pi   <span class="token number">0</span>/1           103s       103s\n \nNAME           READY   STATUS              RESTARTS     AGE\npod/pi-drrft   <span class="token number">0</span>/1     RunContainerError   <span class="token number">4</span> <span class="token punctuation">(</span>8s ago<span class="token punctuation">)</span>   103s\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="回退限制" tabindex="-1"><a class="header-anchor" href="#回退限制" aria-hidden="true">#</a> 回退限制</h2><p>backoffLimit 表示回退限制，可以指定重试几次后将 Job 标记为失败。 如果没有明确指定它，则默认为6。 job.yaml：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: batch/v1\nkind: Job\nmetadata:\n  name: pi\nspec:\n  backoffLimit: <span class="token number">2</span>\n  template:\n    spec:\n      containers:\n      - name: pi\n        image: perl:5.34.0\n        command: <span class="token punctuation">[</span><span class="token string">&quot;perl&quot;</span>,  <span class="token string">&quot;-Mbignum=bpi&quot;</span>, <span class="token string">&quot;-wle&quot;</span>, <span class="token string">&quot;print bpi(2000)&quot;</span><span class="token punctuation">]</span>\n      restartPolicy: Never\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建它，查看Job 、Pods 的状态， 可以看到重试了两次，但是还是失败了，后面就没有再次重试了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl apply -f  job.yaml</span>\njob.batch/pi created  \n \n<span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl get jobs,pods  </span>\nNAME           COMPLETIONS   DURATION   AGE\njob.batch/pi   <span class="token number">0</span>/1           80s        80s\n \nNAME           READY   STATUS       RESTARTS   AGE\npod/pi-6hqmr   <span class="token number">0</span>/1     StartError   <span class="token number">0</span>          76s\npod/pi-sj98k   <span class="token number">0</span>/1     StartError   <span class="token number">0</span>          80s\npod/pi-xc5k4   <span class="token number">0</span>/1     StartError   <span class="token number">0</span>          66s\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="并行执行-job" tabindex="-1"><a class="header-anchor" href="#并行执行-job" aria-hidden="true">#</a> 并行执行 Job</h2><p>同时运行多个 Pod，提高 Job 的执行效率。这个可以通过 parallelism 设置。</p><h3 id="parallelism" tabindex="-1"><a class="header-anchor" href="#parallelism" aria-hidden="true">#</a> parallelism</h3><p>job.yaml：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: batch/v1\nkind: Job\nmetadata:\n  name: pi\nspec:\n  parallelism: <span class="token number">2</span>\n  template:\n    spec:\n      containers:\n      - name: pi\n        image: perl:5.34.0\n        command: <span class="token punctuation">[</span><span class="token string">&quot;perl&quot;</span>,  <span class="token string">&quot;-Mbignum=bpi&quot;</span>, <span class="token string">&quot;-wle&quot;</span>, <span class="token string">&quot;print bpi(2000)&quot;</span><span class="token punctuation">]</span>\n      restartPolicy: Never\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建它，查看Job 、Pods 的状态， Job 一共启动了两个 Pod，而且 AGE 相同，可见是并行运行的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl apply -f  job.yaml</span>\njob.batch/pi created\n \n \n<span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl get jobs,pods</span>\nNAME           COMPLETIONS   DURATION   AGE\njob.batch/pi   <span class="token number">2</span>/1 of <span class="token number">2</span>      8s         13s\n \nNAME           READY   STATUS      RESTARTS   AGE\npod/pi-k9bfs   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          13s\npod/pi-ztcxv   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          13s\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="completions" tabindex="-1"><a class="header-anchor" href="#completions" aria-hidden="true">#</a> completions</h3><p>还可以通过 completions 设置 Job 成功完成 Pod 的总数 修改 job.yaml： 每次运行两个 Pod，直到总共有 6 个 Pod 成功完成</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: batch/v1\nkind: Job\nmetadata:\n  name: pi\nspec:\n  parallelism: <span class="token number">2</span>\n  completions: <span class="token number">6</span>\n  template:\n    spec:\n      containers:\n      - name: pi\n        image: perl:5.34.0\n        command: <span class="token punctuation">[</span><span class="token string">&quot;perl&quot;</span>,  <span class="token string">&quot;-Mbignum=bpi&quot;</span>, <span class="token string">&quot;-wle&quot;</span>, <span class="token string">&quot;print bpi(2000)&quot;</span><span class="token punctuation">]</span>\n      restartPolicy: Never\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建它，查看Job 、Pods 的状态， 可见一共有6个Pod完成任务，符合预期。如果不指定 completions 和 parallelism，默认值均为 1</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl apply -f  job.yaml</span>\njob.batch/pi created\n \n \n \n<span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl get jobs,pods</span>\nNAME           COMPLETIONS   DURATION   AGE\njob.batch/pi   <span class="token number">6</span>/6           25s        31s\n \nNAME           READY   STATUS      RESTARTS   AGE\npod/pi-67vm7   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          31s\npod/pi-bb8nl   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          22s\npod/pi-fchrq   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          14s\npod/pi-k47pr   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          22s\npod/pi-rt8n8   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          14s\npod/pi-zzc96   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          31s\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自动清理完成的-job" tabindex="-1"><a class="header-anchor" href="#自动清理完成的-job" aria-hidden="true">#</a> 自动清理完成的 Job</h2><p>发现 Job 完成以后，Pod 依然存在，完成的 Job 通常不需要留存在系统中，在系统中一直保留它们会给 API 服务器带来额外的压力 自动清理已完成 Job （状态为 Complete 或 Failed）的另一种方式是使用由 TTL 控制器 所提供 的 TTL 机制。 通过设置 Job 的 .spec.ttlSecondsAfterFinished 字段，可以让该控制器清理掉 已结束的资源。如果该字段设置为 0，Job 在结束之后立即成为可被自动删除的对象。 如果该字段没有设置，Job 不会在结束之后被 TTL 控制器自动清除。 尝试一下： job.yaml：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: batch/v1\nkind: Job\nmetadata:\n  name: pi\nspec:  \n  ttlSecondsAfterFinished: <span class="token number">20</span> <span class="token comment">##任务完成以后，20s自动清理Pod</span>\n  template:\n    spec:\n      containers:\n      - name: pi\n        image: perl:5.34.0\n        command: <span class="token punctuation">[</span><span class="token string">&quot;perl&quot;</span>,  <span class="token string">&quot;-Mbignum=bpi&quot;</span>, <span class="token string">&quot;-wle&quot;</span>, <span class="token string">&quot;print bpi(2000)&quot;</span><span class="token punctuation">]</span>\n      restartPolicy: Never\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建它，查看Job 、Pods 的状态，</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl apply -f  job.yaml</span>\njob.batch/pi created  \n \n  \n<span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl get jobs,pods</span>\nNAME           COMPLETIONS   DURATION   AGE\njob.batch/pi   <span class="token number">1</span>/1           8s         27s\n \nNAME           READY   STATUS      RESTARTS   AGE\npod/pi-2k4b6   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          27s\n \n<span class="token comment"># 等待20s后 立即删除</span>\n<span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl get jobs,pods</span>\nNo resources found <span class="token keyword">in</span> default namespace.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定时执行-job" tabindex="-1"><a class="header-anchor" href="#定时执行-job" aria-hidden="true">#</a> 定时执行 Job</h2><p>Linux 中有 cron 程序定时执行任务，Kubernetes 的 CronJob 也提供了类似的功能，可以定时执行 Job。CronJob 配置文件示例如下： cronjob.yaml：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: pi\nspec:\n  schedule: <span class="token string">&quot;* * * * *&quot;</span>\n  jobTemplate:\n    spec:\n      template:\n        spec:\n          containers:\n          - name: pi\n            image: perl:5.34.0\n            command: <span class="token punctuation">[</span><span class="token string">&quot;perl&quot;</span>,  <span class="token string">&quot;-Mbignum=bpi&quot;</span>, <span class="token string">&quot;-wle&quot;</span>, <span class="token string">&quot;print bpi(2000)&quot;</span><span class="token punctuation">]</span>\n          restartPolicy: OnFailure\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建它，查看 cronjobs 、Pods 的状态， 可以看到每隔一分钟就会启动一个 Job：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl apply -f cronjob.yaml</span>\ncronjob.batch/pi created\n \n \n<span class="token punctuation">[</span>root@nsg<span class="token punctuation">]</span>/tmp/test<span class="token comment"># kubectl get cronjobs,pods</span>\nNAME               SCHEDULE    SUSPEND   ACTIVE   LAST SCHEDULE   AGE\ncronjob.batch/pi   * * * * *   False     <span class="token number">1</span>        7s              2m36s\n \nNAME                    READY   STATUS      RESTARTS   AGE\npod/pi-28255870-cd4mx   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          2m7s\npod/pi-28255871-9tv6x   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          67s\npod/pi-28255872-nl99x   <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          7s\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-job-的注意事项" tabindex="-1"><a class="header-anchor" href="#使用-job-的注意事项" aria-hidden="true">#</a> 使用 Job 的注意事项</h2><p>在使用 Kubernetes Job 时，需要注意以下几点：</p><ol><li>Job 对象适用于一次性任务或批处理作业，不适用于长时间运行的服务。</li><li>需要确保 Job Spec 中定义的容器可以正常运行，并有足够的资源和权限执行指定的操作。</li><li>在设计 Job 时，应考虑 Pod 失败和重试的情况，并设置合适的重试次数和间隔时间。</li><li>如果 Job 执行时间过长，需要设置合适的 Pod 生命周期以避免过度消耗资源。</li><li>在使用 Job 控制器时，应确保控制器的版本和 Kubernetes 版本兼容。在不同版本之间可能存在语法变更和行为差异。</li></ol><h2 id="更多特性" tabindex="-1"><a class="header-anchor" href="#更多特性" aria-hidden="true">#</a> 更多特性</h2>', 50);
const _hoisted_51 = {
  href: "https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/job/",
  target: "_blank",
  rel: "noopener noreferrer"
};
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createTextVNode("参考官网："),
      createBaseVNode("a", _hoisted_51, [
        createTextVNode("https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/job/"),
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
const ruheshiyongKubernetes_Jobyunxingyicixingrenwu_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ruheshiyongKubernetes Jobyunxingyicixingrenwu.html.vue"]]);
export {
  ruheshiyongKubernetes_Jobyunxingyicixingrenwu_html as default
};