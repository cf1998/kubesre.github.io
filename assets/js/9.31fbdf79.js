(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{439:function(s,a,e){"use strict";e.r(a);var r=e(16),t=Object(r.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("p",[s._v("Pod 可以有优先级。优先级表示一个Pod相对于其他Pod的重要性。如果一个重要性的Pod无法调度（处于Pending状态），调度程序会尝试 抢占（驱逐）较低优先级的 Pod， 以使悬决 Pod 可以被调度。")]),s._v(" "),e("h2",{attrs:{id:"priorityclass"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#priorityclass"}},[s._v("#")]),s._v(" PriorityClass")]),s._v(" "),e("p",[s._v("PriorityClass 是一个无名称空间对象，它定义了从优先级类名称到优先级整数值的映射值在必填的 。 PriorityClass 对象的名称必须是有效的 DNS 子域 并且它不能以 "),e("code",[s._v("system-")]),s._v(" 为前缀。")]),s._v(" "),e("p",[s._v("PriorityClass 对象。 较大的数字是为通常不应被抢占或驱逐的关键的系统 Pod 所保留的。 集群管理员应该为这类映射分别创建独立的 PriorityClass 对象。")]),s._v(" "),e("p",[e("strong",[s._v("注意：")])]),s._v(" "),e("ul",[e("li",[s._v("如果你升级一个已经存在的但尚未使用此特性的集群，该集群中已经存在Pod的优先级等效于零")]),s._v(" "),e("li",[s._v("添加一个 将 "),e("code",[s._v("globalDefault")]),s._v(" 设置为 "),e("code",[s._v("true")]),s._v(" 的 PriorityClass 不会改变现有 Pod 的优先级。 此类 PriorityClass 的值仅用于添加 PriorityClass 后创建的 Pod。")]),s._v(" "),e("li",[s._v("如果你删除了某个")]),s._v(" "),e("li",[s._v("PriorityClass 对象，则使用被删除的 PriorityClass 名称的现有 Pod 保持不变， 但是你不能再创建使用已删除的 PriorityClass 名称的 Pod。")])]),s._v(" "),e("h2",{attrs:{id:"priorityclass-example"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#priorityclass-example"}},[s._v("#")]),s._v(" PriorityClass example")]),s._v(" "),e("p",[s._v("首先在Kubernetetes集群中创建一个PriorityClass对象（无需指定namespace）")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cat high-priority.yml ")]),s._v("\napiVersion: scheduling.k8s.io/v1\nkind: PriorityClass\nmetadata:\n  name: high-priority\nvalue: "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1000000")]),s._v("\nglobalDefault: "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\ndescription: "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"优先级高"')]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl apply -f high-priority.yml ")]),s._v("\npriorityclass.scheduling.k8s.io/high-priority created\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br")])]),e("p",[e("strong",[s._v("字段解释：")])]),s._v(" "),e("ul",[e("li",[e("p",[e("code",[s._v("name")]),s._v("：字段中指定在 PriorityClass 对象元数据的 名称")])]),s._v(" "),e("li",[e("p",[e("code",[s._v("value")]),s._v(" 字段中指定优先级。值越大，优先级越高，可以设置任何小于或等于 10 亿的 32 位整数值")])]),s._v(" "),e("li",[e("p",[e("code",[s._v("globalDefault")]),s._v(" 字段表示这个 PriorityClass 的值应该用于没有 "),e("code",[s._v("priorityClassName")]),s._v(" 的 Pod。 系统中只能存在一个 "),e("code",[s._v("globalDefault")]),s._v(" 设置为 true 的 PriorityClass，如果不存在设置了 "),e("code",[s._v("globalDefault")]),s._v(" 的 PriorityClass， 则没有 "),e("code",[s._v("priorityClassName")]),s._v(" 的 Pod 的优先级为零")])]),s._v(" "),e("li",[e("p",[e("code",[s._v("description")]),s._v(" 字段是此 PriorityClass的一个描述信息")])])]),s._v(" "),e("p",[s._v("PriorityClass对象创建完毕后，我们需要创建一个Pod来引用。")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# vim nginx.yml")]),s._v("\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\n  labels:\n    env: "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("test")]),s._v("\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    imagePullPolicy: IfNotPresent\n  priorityClassName: high-priority\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kubectl apply -f nginx.yml ")]),s._v("\npod/nginx created\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br")])]),e("p",[e("strong",[s._v("字段解释：")])]),s._v(" "),e("ul",[e("li",[s._v("priorityClassName 字段指定引用某个priorityClass对象")])]),s._v(" "),e("h2",{attrs:{id:"非抢占式-priorityclass"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#非抢占式-priorityclass"}},[s._v("#")]),s._v(" 非抢占式 PriorityClass")]),s._v(" "),e("p",[s._v("默认创建的PriorityClass是抢占式的如果一个重要性的Pod无法调度（处于Pending状态），调度程序会尝试 抢占（驱逐）较低优先级的 Pod， 而使悬决 Pod 可以被调度。这样在某种应用场景反而不太好。"),e("strong",[s._v("那非抢占式 PriorityClass又是什么呢？")])]),s._v(" "),e("p",[s._v("Pod调度的时候将被放置在调度队列 中较低优先级 Pod 之前  但它们不能抢占其他 Pod，而是等待调度的非抢占式 Pod 将留在调度队列中，直到有足够的可用资源， 它才可以被调度。")]),s._v(" "),e("p",[e("strong",[s._v("非抢占式 Pod 仍可能被其他高优先级 Pod 抢占。")])]),s._v(" "),e("p",[e("code",[s._v("PreemptionPolicy")]),s._v(" 默认为 "),e("code",[s._v("PreemptLowerPriority")]),s._v("， 这将允许该 PriorityClass 的 Pod 抢占较低优先级的 Pod（现有默认行为也是如此）。 如果 "),e("code",[s._v("PreemptionPolicy")]),s._v(" 设置为 "),e("code",[s._v("Never")]),s._v("，则该 PriorityClass 中的 Pod 将是非抢占式的。")]),s._v(" "),e("h2",{attrs:{id:"非抢占式-priorityclass-example"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#非抢占式-priorityclass-example"}},[s._v("#")]),s._v(" 非抢占式 PriorityClass example")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("apiVersion: scheduling.k8s.io/v1\nkind: PriorityClass\nmetadata:\n  name: high-priority-nonpreempting\nvalue: "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1000000")]),s._v("\npreemptionPolicy: Never\nglobalDefault: "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\ndescription: "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"非抢占式 PriorityClass example"')]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br")])]),e("h2",{attrs:{id:"pod-优先级和服务质量之间的相互作用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pod-优先级和服务质量之间的相互作用"}},[s._v("#")]),s._v(" Pod 优先级和服务质量之间的相互作用")]),s._v(" "),e("p",[s._v("Pod 优先级和 QoS 类 是两个正交特征，交互很少，并且对基于 QoS 类设置 Pod 的优先级没有默认限制。 调度器的抢占逻辑在选择抢占目标时不考虑 QoS。 抢占会考虑 Pod 优先级并尝试选择一组优先级最低的目标。 仅当移除优先级最低的 Pod 不足以让调度程序调度抢占式 Pod， 或者最低优先级的 Pod 受 PodDisruptionBudget 保护时，才会考虑优先级较高的 Pod。")]),s._v(" "),e("p",[s._v("kubelet 使用优先级来确定 节点压力驱逐 Pod 的顺序。 你可以使用 QoS 类来估计 Pod 最有可能被驱逐的顺序。kubelet 根据以下因素对 Pod 进行驱逐排名：")]),s._v(" "),e("ol",[e("li",[s._v("对紧俏资源的使用是否超过请求值")]),s._v(" "),e("li",[s._v("Pod 优先级")]),s._v(" "),e("li",[s._v("相对于请求的资源使用量")])]),s._v(" "),e("h2",{attrs:{id:"参考文章"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[s._v("#")]),s._v(" 参考文章")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://kubernetes.io/zh/docs/concepts/scheduling-eviction/pod-priority-preemption/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://kubernetes.io/zh/docs/concepts/scheduling-eviction/pod-priority-preemption/"),e("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=t.exports}}]);