import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, b as createBaseVNode, d as createTextVNode, e as createVNode, a as createStaticVNode } from "./app-9ba53931.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h2 id="上篇回顾" tabindex="-1"><a class="header-anchor" href="#上篇回顾" aria-hidden="true">#</a> 上篇回顾</h2><p>上篇文章我们主要是针对告警路由进行了讲解，告警路由使用无疑是非常方便的，但是缺少一些告警处理人相关提醒，所以我们本篇文章讲解一下告警认领的功能实现</p><h2 id="prometheus架构图" tabindex="-1"><a class="header-anchor" href="#prometheus架构图" aria-hidden="true">#</a> prometheus架构图</h2><p><img src="https://img.kubesre.com/kubesre/20230828/1.png" alt=""></p><p>通过上图我们可以发现，告警主要是<code>Alertmanager</code>组件管理，所以我们需要提供一个hook接收<code>Alertmanager</code>的告警信息，然后对告警数据进行处理，以达到我们实现告警认领的目的</p><h2 id="案例介绍" tabindex="-1"><a class="header-anchor" href="#案例介绍" aria-hidden="true">#</a> 案例介绍</h2><p>使用gin+gorm、来实现一个hook，使得我们可以处理<code>Alertmanager</code>发送过来的告警数据，钉钉outgoing机制传递用户ID，使用钉钉<code>dtmd</code>来自动实现回复功能</p><h2 id="环境概述" tabindex="-1"><a class="header-anchor" href="#环境概述" aria-hidden="true">#</a> 环境概述</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># kubectl get nodes </span>\nNAME               STATUS   ROLES                  AGE   VERSION\nk8s-master-50.57   Ready    control-plane,master   96d   v1.20.5\nk8s-node-50.58     Ready    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>                 96d   v1.20.5\nk8s-node-50.59     Ready    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>                 96d   v1.20.5\n\n<span class="token comment"># kubectl get pod -n monitoring </span>\nNAME                                  READY   STATUS    RESTARTS   AGE\nalertmanager-main-0                   <span class="token number">2</span>/2     Running   <span class="token number">0</span>          8d\nalertmanager-main-1                   <span class="token number">2</span>/2     Running   <span class="token number">0</span>          8d\nalertmanager-main-2                   <span class="token number">2</span>/2     Running   <span class="token number">0</span>          8d\nblackbox-exporter-55c457d5fb-5m7ql    <span class="token number">3</span>/3     Running   <span class="token number">0</span>          8d\ngrafana-9df57cdc4-gpzsq               <span class="token number">1</span>/1     Running   <span class="token number">0</span>          8d\nkube-state-metrics-56dbb74497-gpkn9   <span class="token number">3</span>/3     Running   <span class="token number">0</span>          8d\nnode-exporter-4wl6d                   <span class="token number">2</span>/2     Running   <span class="token number">0</span>          8d\nnode-exporter-b4595                   <span class="token number">2</span>/2     Running   <span class="token number">0</span>          8d\nnode-exporter-g4l99                   <span class="token number">2</span>/2     Running   <span class="token number">0</span>          8d\nprometheus-adapter-59df95d9f5-tnt4w   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          8d\nprometheus-adapter-59df95d9f5-xhz5v   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          8d\nprometheus-k8s-0                      <span class="token number">2</span>/2     Running   <span class="token number">1</span>          8d\nprometheus-k8s-1                      <span class="token number">2</span>/2     Running   <span class="token number">1</span>          10m\nprometheus-operator-c46b8b7c9-mg9cv   <span class="token number">2</span>/2     Running   <span class="token number">0</span>          8d\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>golang版本：1.17.10</p></li><li><p>gin版本：1.9.0</p></li><li><p>gorm版本：1.25.1</p></li></ul><h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2><ol><li>钉钉机器人创建</li></ol>', 12);
const _hoisted_13 = {
  href: "https://login.dingtalk.com/oauth2/challenge.htm?redirect_uri=https%3A%2F%2Fopen-dev.dingtalk.com%2Fdingtalk_sso_call_back%3Fcontinue%3Dhttps%253A%252F%252Fopen-dev.dingtalk.com%252F&response_type=code&client_id=dingbakuoyxavyp5ruxw&scope=openid+corpid",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_14 = /* @__PURE__ */ createStaticVNode('<p><img src="https://img.kubesre.com/kubesre/20230828/2.png" alt=""></p><p><img src="https://img.kubesre.com/kubesre/20230828/3.png" alt=""></p><blockquote><p>本篇文章机器人名称为：test</p></blockquote><p><img src="https://img.kubesre.com/kubesre/20230828/4.png" alt=""></p><ol start="2"><li>钉钉群聊添加机器人</li></ol><p><img src="https://img.kubesre.com/kubesre/20230828/5.png" alt=""></p><h3 id="核心代码" tabindex="-1"><a class="header-anchor" href="#核心代码" aria-hidden="true">#</a> 核心代码</h3><ol><li>数据库字段设计</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> PrometheusAlert <span class="token keyword">struct</span> <span class="token punctuation">{</span>\n	ID             <span class="token builtin">uint</span>           <span class="token string">`gorm:&quot;primarykey&quot; json:&quot;id&quot; form:&quot;id&quot;`</span>\n	CreatedAt      time<span class="token punctuation">.</span>Time      <span class="token string">`gorm:&quot;column:creation_time&quot; json:&quot;created_at&quot; form:&quot;created_at&quot;`</span>\n	UpdatedAt      time<span class="token punctuation">.</span>Time      <span class="token string">`gorm:&quot;column:update_time&quot; json:&quot;updated_at&quot; form:&quot;updated_at&quot;`</span>\n	DeletedAt      gorm<span class="token punctuation">.</span>DeletedAt <span class="token string">`gorm:&quot;column:delete_time;index&quot; json:&quot;deleted_at&quot; form:&quot;deleted_at&quot;`</span>\n	AlertName      <span class="token builtin">string</span>         <span class="token string">`gorm:&quot;comment: &#39;告警名称&#39;;size:500;not null&quot; json:&quot;alert_name&quot; form:&quot;alert_name&quot;`</span>\n	Instance       <span class="token builtin">string</span>         <span class="token string">`gorm:&quot;comment: &#39;告警实例&#39;;size:500&quot; json:&quot;instance&quot; form:&quot;instance&quot;`</span>\n	Server         <span class="token builtin">string</span>         <span class="token string">`gorm:&quot;comment: &#39;告警环境&#39;;size:64&quot; json:&quot;server&quot; form:&quot;server&quot;`</span>\n	Severity       <span class="token builtin">string</span>         <span class="token string">`gorm:&quot;comment: &#39;告警级别&#39;;size:64&quot; json:&quot;severity&quot; form:&quot;severity&quot;`</span>\n	AlertInfo      <span class="token builtin">string</span>         <span class="token string">`gorm:&quot;comment: &#39;告警详情&#39;;size:500&quot; json:&quot;alert_info&quot; form:&quot;alert_info&quot;`</span>\n	IsAlert        <span class="token builtin">bool</span>           <span class="token string">`gorm:&quot;comment: &#39;是否告警&#39;;size:1;default:1&quot; json:&quot;is_alert&quot; form:&quot;is_alert&quot;`</span>\n	FirstAlertTime time<span class="token punctuation">.</span>Time      <span class="token string">`gorm:&quot;comment: &#39;第一次告警时间&#39;&quot; json:&quot;first_alert_time&quot; form:&quot;first_alert_time&quot;`</span>\n	EndAlertTime   time<span class="token punctuation">.</span>Time      <span class="token string">`gorm:&quot;comment: &#39;结束告警时间&#39;&quot; json:&quot;end_alert_time&quot; form:&quot;end_alert_time&quot;`</span>\n	IsClaim        <span class="token builtin">bool</span>           <span class="token string">`gorm:&quot;comment: &#39;是否认领&#39;;size:1;default:0&quot; json:&quot;is_claim&quot; form:&quot;is_claim&quot;`</span>\n	Pod            <span class="token builtin">string</span>         <span class="token string">`gorm:&quot;comment: &#39;pod名称&#39;;size:255&quot; json:&quot;pod&quot; form:&quot;pod&quot;`</span>\n	Container      <span class="token builtin">string</span>         <span class="token string">`gorm:&quot;comment: &#39;容器名称&#39;;size:255&quot; json:&quot;container&quot; form:&quot;container&quot;`</span>\n	Namespace      <span class="token builtin">string</span>         <span class="token string">`gorm:&quot;comment: &#39;名称空间&#39;;size:255&quot; json:&quot;namespace&quot; form:&quot;namespace&quot;`</span>\n	ClaimUsers     <span class="token builtin">string</span>         <span class="token string">`gorm:&quot;comment: &#39;认领人&#39;;size:500&quot; json:&quot;claim_users&quot; form:&quot;claim_users&quot;`</span>\n	UID            <span class="token builtin">string</span>         <span class="token string">`gorm:&quot;comment: &#39;告警UID&#39;;size:500;not null;unique&quot; json:&quot;uid&quot; form:&quot;uid&quot;`</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>主要说一下UID字段含义，主要功能是对每一条告警增加一个<code>UID</code>，用于区分是否为同一条告警记录，进而绑定认领人，这里的<code>UID</code>使用<code>md5</code>的方式加密告警字段</p></blockquote><ol start="2"><li>钉钉机器人回调事件</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>cbd <span class="token operator">*</span>callBackDing<span class="token punctuation">)</span> <span class="token function">CallBack</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n	<span class="token keyword">var</span> dingBody <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>model<span class="token punctuation">.</span>DingTalkCallBackBody<span class="token punctuation">)</span>\n	err <span class="token operator">:=</span> check<span class="token punctuation">.</span><span class="token function">ParamsCheck</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dingBody<span class="token punctuation">)</span>\n	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>\n		response<span class="token punctuation">.</span><span class="token function">ReturnContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Failed</span><span class="token punctuation">(</span><span class="token string">&quot;fail&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>\n		<span class="token keyword">return</span>\n	<span class="token punctuation">}</span>\n	err <span class="token operator">=</span> service<span class="token punctuation">.</span>PrometheusAlert<span class="token punctuation">.</span><span class="token function">UpdatePrometheusAlertClaimUsers</span><span class="token punctuation">(</span>dingBody<span class="token punctuation">.</span>SenderStaffId<span class="token punctuation">,</span> dingBody<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Content<span class="token punctuation">)</span>\n	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>\n		response<span class="token punctuation">.</span><span class="token function">ReturnContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Failed</span><span class="token punctuation">(</span><span class="token string">&quot;fail&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>\n		<span class="token keyword">return</span>\n	<span class="token punctuation">}</span>\n	response<span class="token punctuation">.</span><span class="token function">ReturnContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Successful</span><span class="token punctuation">(</span><span class="token string">&quot;success&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">func</span> <span class="token punctuation">(</span>pa <span class="token operator">*</span>prometheusAlert<span class="token punctuation">)</span> <span class="token function">UpdatePrometheusAlertClaimUsers</span><span class="token punctuation">(</span>userID<span class="token punctuation">,</span> uid <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n	uid <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span>uid<span class="token punctuation">)</span>\n	data<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span>PrometheusAlert<span class="token punctuation">.</span><span class="token function">SelectPrometheusAlert</span><span class="token punctuation">(</span>uid<span class="token punctuation">)</span>\n	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>\n		<span class="token keyword">return</span> err\n	<span class="token punctuation">}</span>\n	<span class="token keyword">if</span> strings<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>ClaimUsers<span class="token punctuation">,</span> userID<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n		<span class="token comment">//已经存在该用户了</span>\n		common<span class="token punctuation">.</span>TPLogger<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">&quot;已经存在该用户了&quot;</span><span class="token punctuation">)</span>\n		<span class="token keyword">return</span> <span class="token boolean">nil</span>\n	<span class="token punctuation">}</span>\n	userIDs <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">StringToSlice</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>ClaimUsers<span class="token punctuation">)</span>\n	userIDs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>userIDs<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;\\&quot;%s\\&quot;&quot;</span><span class="token punctuation">,</span> userID<span class="token punctuation">)</span><span class="token punctuation">)</span>\n	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;此时用户ID，&quot;</span><span class="token punctuation">,</span> userIDs<span class="token punctuation">)</span>\n	err <span class="token operator">=</span> db<span class="token punctuation">.</span>PrometheusAlert<span class="token punctuation">.</span><span class="token function">UpdatePrometheusAlertClaimUsers</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%s&quot;</span><span class="token punctuation">,</span> userIDs<span class="token punctuation">)</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>\n	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>\n		common<span class="token punctuation">.</span>TPLogger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">&quot;更新认领人失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>\n		<span class="token keyword">return</span> err\n	<span class="token punctuation">}</span>\n	common<span class="token punctuation">.</span>TPLogger<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">&quot;更新认领人成功&quot;</span><span class="token punctuation">)</span>\n	<span class="token keyword">return</span> <span class="token boolean">nil</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>这里主要功能为接受钉钉的回调事件，并提取userid，发送内容(该内容不用输入，我们使用dtmd功能实现)</p></blockquote><ol start="3"><li>钉钉回调body</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;conversationId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cidkxS5Uphxg1sdgXkltSWi/A==&quot;</span><span class="token punctuation">,</span> # 加密的会话ID\n    <span class="token property">&quot;atUsers&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>  # 被@人的信息   dingtalkId：加密的发送者ID   staffId：当前企业内部群中员工userid值。\n        <span class="token punctuation">{</span>\n            <span class="token property">&quot;dingtalkId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;$:LWCP_v1:$+av1jFT6ZUh9e10G0DuOSS9MrDOOSiz/&quot;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;chatbotCorpId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxxxxxxxxxxxxxxxxxxx&quot;</span><span class="token punctuation">,</span>  # 加密的机器人所在的企业corpId。\n    <span class="token property">&quot;chatbotUserId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxxxxxxxxxxxxxxxxxxxxxxxx&quot;</span><span class="token punctuation">,</span> # 加密的机器人ID。\n    <span class="token property">&quot;msgId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxxxxxxxxxxxxxxxxxxxxxxx&quot;</span><span class="token punctuation">,</span>  # 加密的消息ID\n    <span class="token property">&quot;senderNick&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张行雷&quot;</span><span class="token punctuation">,</span>  # 发送者昵称\n    <span class="token property">&quot;isAdmin&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>  # 是否为管理员\n    <span class="token property">&quot;senderStaffId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxxxxxxxxxxxxxxxxxxxxxxxx&quot;</span><span class="token punctuation">,</span>  # 企业内部群中@该机器人的成员userid。\n    <span class="token property">&quot;sessionWebhookExpiredTime&quot;</span><span class="token operator">:</span> <span class="token number">1664276341892</span><span class="token punctuation">,</span>  # 当前会话的Webhook地址过期时间 单位ms\n    <span class="token property">&quot;createAt&quot;</span><span class="token operator">:</span> <span class="token number">1664270941724</span><span class="token punctuation">,</span>  # 消息时间戳，单位ms\n    <span class="token property">&quot;senderCorpId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxxxxxxxxxxxxxxxxxxxxxxxx&quot;</span><span class="token punctuation">,</span>  # 企业内部群有的发送者当前群的企业corpId。\n    <span class="token property">&quot;conversationType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> # 单聊还是群聊 <span class="token number">1</span>：单聊  <span class="token number">2</span>：群聊\n    <span class="token property">&quot;senderId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxxxxxxxxxxxxxxxxxxxxxxxx&quot;</span><span class="token punctuation">,</span>  # 加密的发送者ID\n    <span class="token property">&quot;conversationTitle&quot;</span><span class="token operator">:</span> <span class="token string">&quot;自动回复机器人调试&quot;</span><span class="token punctuation">,</span>   # 群聊时才有的会话标题\n    <span class="token property">&quot;isInAtList&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> # 是否再@列表中\n    <span class="token property">&quot;sessionWebhook&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://oapi.dingtalk.com/robot/sendBySession?session=xxxxxxxxxxxxxxxxxxxxxxxxx&quot;</span><span class="token punctuation">,</span>  # 该钉钉机器人的webhook地址\n    <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot; 123&quot;</span>  # 消息文本\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;robotCode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxxxxxxxxxxxxxxxxxxxxxxxx&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;msgtype&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>  # 目前只支持text，消息类型\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置alertmanager" tabindex="-1"><a class="header-anchor" href="#配置alertmanager" aria-hidden="true">#</a> 配置Alertmanager</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># cat alertmanager-secret.yaml</span>\n<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1\n<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret\n<span class="token key atrule">metadata</span><span class="token punctuation">:</span>\n  <span class="token key atrule">labels</span><span class="token punctuation">:</span>\n    <span class="token key atrule">alertmanager</span><span class="token punctuation">:</span> main\n    <span class="token key atrule">app.kubernetes.io/component</span><span class="token punctuation">:</span> alert<span class="token punctuation">-</span>router\n    <span class="token key atrule">app.kubernetes.io/name</span><span class="token punctuation">:</span> alertmanager\n    <span class="token key atrule">app.kubernetes.io/part-of</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>prometheus\n    <span class="token key atrule">app.kubernetes.io/version</span><span class="token punctuation">:</span> 0.21.0\n  <span class="token key atrule">name</span><span class="token punctuation">:</span> alertmanager<span class="token punctuation">-</span>main\n  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> monitoring\n<span class="token key atrule">stringData</span><span class="token punctuation">:</span>\n  <span class="token key atrule">alertmanager.yaml</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>\n    <span class="token comment">## Alertmanager 配置文件</span>\n    <span class="token key atrule">global</span><span class="token punctuation">:</span>\n      <span class="token key atrule">resolve_timeout</span><span class="token punctuation">:</span> 1m  <span class="token comment"># 该参数定义了当Alertmanager持续多长时间未接收到告警后标记告警状态为resolved（已解决）</span>\n    <span class="token comment"># 路由分组</span>\n    <span class="token key atrule">route</span><span class="token punctuation">:</span>\n      <span class="token key atrule">receiver</span><span class="token punctuation">:</span> devops  <span class="token comment"># 默认的接收器名称</span>\n      <span class="token key atrule">group_wait</span><span class="token punctuation">:</span> 30s <span class="token comment"># 在组内等待所配置的时间，如果同组内，30秒内出现相同报警，在一个组内发送报警。</span>\n      <span class="token key atrule">group_interval</span><span class="token punctuation">:</span> 1m <span class="token comment"># 如果组内内容不变化，合并为一条警报信息，5m后发送。</span>\n      <span class="token key atrule">repeat_interval</span><span class="token punctuation">:</span> 1m <span class="token comment"># 发送报警间隔，如果指定时间内没有修复，则重新发送报警。</span>\n      <span class="token key atrule">group_by</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>alertname<span class="token punctuation">,</span>instance<span class="token punctuation">]</span>  <span class="token comment"># 报警分组</span>\n    <span class="token comment"># 接收器指定发送人以及发送渠道</span>\n    <span class="token key atrule">receivers</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> devops\n      <span class="token key atrule">webhook_configs</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//192.168.10.70<span class="token punctuation">:</span>8899/api/v1/prometheus/alert\n        <span class="token key atrule">send_resolved</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>\n<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque\n\n<span class="token comment">#  kubectl   apply   -f   alertmanager-secret.yaml</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>这里的<code>http://192.168.10.70:8899/api/v1/prometheus/alert</code>是我们项目接受告警的地址</p></blockquote><h3 id="触发告警" tabindex="-1"><a class="header-anchor" href="#触发告警" aria-hidden="true">#</a> 触发告警</h3><p><img src="https://img.kubesre.com/kubesre/20230828/6.png" alt=""></p><p>当我们点击<code>告警认领</code>按钮时会自定艾特机器人，并发送一个消息(消息内容可以自定义，但是需要包含UID，主要是为了区分认领的是那一条告警)</p><blockquote><p>说明：该UID是用<code>告警名称</code>，<code>告警级别</code>、<code>告警时间</code>、<code>告警pod</code>、<code>告警名称空间</code>进行<code>md5</code>加密而成的字符串</p></blockquote><h4 id="认领后再次告警" tabindex="-1"><a class="header-anchor" href="#认领后再次告警" aria-hidden="true">#</a> 认领后再次告警</h4><p><img src="https://img.kubesre.com/kubesre/20230828/7.png" alt=""></p><blockquote><p>当然认领可以支持多人认领</p></blockquote><h4 id="认领后告警恢复" tabindex="-1"><a class="header-anchor" href="#认领后告警恢复" aria-hidden="true">#</a> 认领后告警恢复</h4><p><img src="https://img.kubesre.com/kubesre/20230828/8.png" alt=""></p><h4 id="无人认领告警恢复" tabindex="-1"><a class="header-anchor" href="#无人认领告警恢复" aria-hidden="true">#</a> 无人认领告警恢复</h4><p><img src="https://img.kubesre.com/kubesre/20230828/9.png" alt=""></p><blockquote><p>告警代码领取方式，可以添加下方二维码</p></blockquote><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>告警认领功能到此已经添加完成，当然其中还有一些地方不够完善的，例如告警静默，告警指派、告警升级等功能，如果有需要后期会慢慢完善。</p>', 32);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_13, [
        createTextVNode("登录钉钉后台"),
        createVNode(_component_ExternalLinkIcon)
      ]),
      createTextVNode("创建机器人")
    ]),
    _hoisted_14
  ]);
}
const gaojingrenling_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "gaojingrenling.html.vue"]]);
export {
  gaojingrenling_html as default
};
