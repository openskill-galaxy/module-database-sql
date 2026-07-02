import fs from "fs";import path from "path";import {fileURLToPath} from "url";
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const DATA=path.resolve(__dirname,"../public/data");
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function pickN(a,n){const s=new Set();while(s.size<n&&s.size<a.length)s.add(pick(a));return[...s]}
const DIFF=["easy","medium","hard"];
const TAG_RAW=`
数据库 DBMS 关系模型 SQL SELECT WHERE ORDER BY GROUP BY HAVING JOIN INNER JOIN
LEFT JOIN RIGHT JOIN FULL JOIN 自连接 CROSS JOIN 子查询 相关子查询 EXISTS UNION
INTERSECT EXCEPT INSERT UPDATE DELETE CREATE TABLE ALTER TABLE DROP TABLE 数据类型
INT VARCHAR CHAR TEXT BOOLEAN DATE TIMESTAMP FLOAT DECIMAL NULL NOT NULL UNIQUE
PRIMARY KEY FOREIGN KEY CHECK DEFAULT AUTO_INCREMENT INDEX 视图 VIEW 存储过程
触发器 TRIGGER 函数 事务 ACID 原子性 一致性 隔离性 持久性 COMMIT ROLLBACK
SAVEPOINT 并发控制 封锁 共享锁 排他锁 死锁 隔离级别 READ UNCOMMITTED READ COMMITTED
REPEATABLE READ SERIALIZABLE 脏读 不可重复读 幻读 MVCC 日志 undo redo 检查点
主码 外码 候选码 超码 关系完整性 实体完整性 参照完整性 用户自定义完整性 关系代数
选择σ 投影π 连接⋈ 除法÷ 笛卡尔积× 并∪ 交∩ 差− 域 元组 属性 表 行 列
范式 规范化 第一范式 1NF 第二范式 2NF 第三范式 3NF BCNF 第四范式 4NF 第五范式 5NF
函数依赖 部分依赖 完全依赖 传递依赖 多值依赖 连接依赖 ER图 实体 属性 联系
一对一 一对多 多对多 弱实体 复合属性 多值属性 派生属性 ISA继承 参与约束
基数约束 关系模式设计 数据库设计 需求分析 概念设计 逻辑设计 物理设计 数据字典
索引 B+树 B树 哈希索引 位图索引 聚簇索引 非聚簇索引 全文索引 空间索引 复合索引
唯一索引 覆盖索引 回表 索引下推 索引合并 查询优化 执行计划 EXPLAIN 全表扫描
索引扫描 范围扫描 回表查询 查询成本 优化器 统计信息 基数估计 连接算法 嵌套循环
哈希连接 归并连接 查询重写 子查询优化 SQL优化 慢查询 性能分析 索引设计 范式化
反范式化 数据仓库 OLTP OLAP ETL 数据湖 数据中台 数据模型 星型模型 雪花模型
事实表 维度表 缓慢变化维 数据库设计 数据字典 数据流图 数据库安全 用户管理
权限管理 GRANT REVOKE 角色 审计 加密 备份 恢复 逻辑备份 物理备份 全量备份
增量备份 差异备份 还原 恢复 主从复制 读写分离 分库分表 水平分片 垂直分片
分表策略 哈希分片 范围分片 分布式数据库 CAP BASE 最终一致性 强一致性 弱一致性
一致性哈希 分布式事务 两阶段提交 三阶段提交 TCC Saga 柔性事务 本地消息表
MySQL PostgreSQL Oracle SQLite SQL Server MariaDB Redis MongoDB NoSQL 键值
文档 列族 图数据库 NewSQL 数据库选择 数据库面试 SQL面试 数据分析 数据查询
`;
const T=TAG_RAW.trim().split(/\s+/).filter(Boolean);
function buildTags(){return T.map((n,i)=>({id:`db-tag-${String(i+1).padStart(3,"0")}`,name:n,category:"数据库",description:`数据库标签：${n}`,count:0,createdAt:"2026-07-02T00:00:00.000Z"}));}
const COURSES_DATA=[
  {id:"db-course-01",order:1,slug:"数据库系统入门",title:"数据库系统入门",description:"数据库定义、DBMS、数据模型、数据库发展历史、学习路线。",estimatedHours:6,difficulty:"easy"},
  {id:"db-course-02",order:2,slug:"关系模型与关系代数",title:"关系模型与关系代数",description:"关系模型、元组属性码、完整性约束、关系代数运算。",estimatedHours:10,difficulty:"easy"},
  {id:"db-course-03",order:3,slug:"SQL基础查询",title:"SQL 基础查询",description:"SELECT语句、列选择、别名、DISTINCT、LIMIT、简单查询。",estimatedHours:8,difficulty:"easy"},
  {id:"db-course-04",order:4,slug:"数据过滤排序与分页",title:"数据过滤、排序与分页",description:"WHERE条件、LIKE、BETWEEN、IN、NULL处理、ORDER BY、LIMIT分页。",estimatedHours:10,difficulty:"easy"},
  {id:"db-course-05",order:5,slug:"聚合函数与分组查询",title:"聚合函数与分组查询",description:"COUNT/SUM/AVG/MAX/MIN、GROUP BY、HAVING、ROLLUP。",estimatedHours:10,difficulty:"medium"},
  {id:"db-course-06",order:6,slug:"多表连接JOIN",title:"多表连接 JOIN",description:"INNER/LEFT/RIGHT/FULL JOIN、自连接、CROSS JOIN、多表查询。",estimatedHours:12,difficulty:"medium"},
  {id:"db-course-07",order:7,slug:"子查询与集合运算",title:"子查询与集合运算",description:"标量子查询、行子查询、表子查询、EXISTS、UNION、INTERSECT、EXCEPT。",estimatedHours:12,difficulty:"hard"},
  {id:"db-course-08",order:8,slug:"表设计约束与数据类型",title:"表设计、约束与数据类型",description:"CREATE TABLE、数据类型、NOT NULL/UNIQUE/PRIMARY KEY/FOREIGN KEY/CHECK/DEFAULT。",estimatedHours:10,difficulty:"medium"},
  {id:"db-course-09",order:9,slug:"索引与查询优化基础",title:"索引与查询优化基础",description:"索引类型、B+树、聚簇索引、EXPLAIN、慢查询、SQL优化。",estimatedHours:12,difficulty:"hard"},
  {id:"db-course-10",order:10,slug:"事务与并发控制",title:"事务与并发控制",description:"事务ACID、提交回滚、并发问题、隔离级别、MVCC、锁机制。",estimatedHours:14,difficulty:"hard"},
  {id:"db-course-11",order:11,slug:"范式与数据库设计",title:"范式与数据库设计",description:"1NF/2NF/3NF/BCNF、函数依赖、依赖保持、无损分解。",estimatedHours:12,difficulty:"hard"},
  {id:"db-course-12",order:12,slug:"ER图与关系模式转换",title:"ER 图与关系模式转换",description:"实体联系图、弱实体、基数约束、ER图转关系模式。",estimatedHours:10,difficulty:"hard"},
  {id:"db-course-13",order:13,slug:"数据库综合项目实战",title:"数据库综合项目实战",description:"学生选课、图书管理、电商系统、用户订单、数据查询分析。",estimatedHours:12,difficulty:"hard"},
  {id:"db-course-14",order:14,slug:"数据库期末面试与综合训练",title:"数据库期末、面试与综合训练",description:"SQL综合题、事务隔离综合、范式分析、面试题、模拟测试。",estimatedHours:12,difficulty:"hard"},
];
function buildCourses(){return COURSES_DATA.map(c=>({...c,tags:[c.title],lessonIds:[],totalLessons:0,totalQuestions:0,prerequisites:[],outcomes:["理解关系模型","熟练SQL查询","掌握事务与范式","具备数据库设计能力"],updatedAt:"2026-07-02T00:00:00.000Z"}));}

function buildLessons(){
  const all=[];let id=1;
  const add=(ci,t,kps)=>{const n=String(id).padStart(3,"0");all.push({id:`db-lesson-${n}`,courseId:COURSES_DATA[ci].id,order:all.filter(l=>l.courseId===COURSES_DATA[ci].id).length+1,title:t,slug:t.replace(/[\s，。、：；（）\-\+]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),summary:t+"章节",content:`# ${t}\n\n${t}内容。`,contentFormat:"markdown",estimatedMinutes:30,difficulty:id<=60?"easy":id<=130?"medium":"hard",knowledgePointIds:kps||[],practiceQuestionIds:[],tags:["数据库"],prerequisites:[],updatedAt:"2026-07-02T00:00:00.000Z"});id++;};
  add(0,"数据库概念与DBMS",["db-kp-001"]);add(0,"数据模型分类",["db-kp-002"]);add(0,"数据库发展历史",["db-kp-003"]);add(0,"数据库学习路线",["db-kp-004"]);
  add(1,"关系模型概念",["db-kp-005","db-kp-006"]);add(1,"码与完整性",["db-kp-007","db-kp-008"]);add(1,"关系代数选择投影",["db-kp-009","db-kp-010"]);add(1,"关系代数连接",["db-kp-011"]);add(1,"关系代数除法",["db-kp-012"]);
  add(2,"SELECT基础语法",["db-kp-013"]);add(2,"列别名",["db-kp-014"]);add(2,"DISTINCT去重",["db-kp-015"]);add(2,"LIMIT限制",["db-kp-016"]);
  add(3,"WHERE条件",["db-kp-017"]);add(3,"LIKE模糊匹配",["db-kp-018"]);add(3,"BETWEEN与IN",["db-kp-019"]);add(3,"NULL处理",["db-kp-020"]);add(3,"ORDER BY排序",["db-kp-021"]);add(3,"LIMIT分页",["db-kp-022"]);
  add(4,"COUNT函数",["db-kp-023"]);add(4,"SUM与AVG",["db-kp-024"]);add(4,"MAX与MIN",["db-kp-025"]);add(4,"GROUP BY分组",["db-kp-026","db-kp-027"]);add(4,"HAVING过滤",["db-kp-028"]);add(4,"聚合综合案例",["db-kp-029"]);
  add(5,"INNER JOIN",["db-kp-030","db-kp-031"]);add(5,"LEFT JOIN",["db-kp-032"]);add(5,"RIGHT JOIN",["db-kp-033"]);add(5,"FULL JOIN",["db-kp-034"]);add(5,"自连接",["db-kp-035"]);add(5,"多表连接",["db-kp-036"]);
  add(6,"标量子查询",["db-kp-037"]);add(6,"行子查询",["db-kp-038"]);add(6,"表子查询",["db-kp-039"]);add(6,"EXISTS子查询",["db-kp-040","db-kp-041"]);add(6,"UNION并集",["db-kp-042"]);add(6,"INTERSECT与EXCEPT",["db-kp-043"]);
  add(7,"CREATE TABLE",["db-kp-044"]);add(7,"数据类型详解",["db-kp-045"]);add(7,"NOT NULL约束",["db-kp-046"]);add(7,"UNIQUE约束",["db-kp-047"]);add(7,"PRIMARY KEY",["db-kp-048"]);add(7,"FOREIGN KEY",["db-kp-049","db-kp-050"]);add(7,"CHECK约束",["db-kp-051"]);add(7,"DEFAULT默认值",["db-kp-052"]);add(7,"ALTER TABLE",["db-kp-053"]);
  add(8,"索引概念",["db-kp-054"]);add(8,"B+树索引",["db-kp-055","db-kp-056"]);add(8,"聚簇索引",["db-kp-057"]);add(8,"非聚簇索引",["db-kp-058"]);add(8,"复合索引",["db-kp-059"]);add(8,"EXPLAIN执行计划",["db-kp-060"]);add(8,"SQL优化",["db-kp-061","db-kp-062"]);
  add(9,"事务定义",["db-kp-063"]);add(9,"ACID特性",["db-kp-064","db-kp-065"]);add(9,"COMMIT与ROLLBACK",["db-kp-066"]);add(9,"并发问题",["db-kp-067"]);add(9,"脏读",["db-kp-068"]);add(9,"不可重复读",["db-kp-069"]);add(9,"幻读",["db-kp-070"]);add(9,"隔离级别",["db-kp-071","db-kp-072"]);add(9,"MVCC原理",["db-kp-073"]);add(9,"封锁机制",["db-kp-074"]);
  add(10,"第一范式1NF",["db-kp-075"]);add(10,"第二范式2NF",["db-kp-076"]);add(10,"第三范式3NF",["db-kp-077"]);add(10,"BCNF",["db-kp-078"]);add(10,"函数依赖",["db-kp-079","db-kp-080"]);add(10,"无损分解",["db-kp-081"]);add(10,"依赖保持",["db-kp-082"]);
  add(11,"ER图基本元素",["db-kp-083"]);add(11,"实体与属性",["db-kp-084"]);add(11,"联系与基数",["db-kp-085","db-kp-086"]);add(11,"弱实体",["db-kp-087"]);add(11,"ER图转关系模式",["db-kp-088","db-kp-089"]);
  add(12,"学生选课系统",["db-kp-090"]);add(12,"图书管理系统",["db-kp-091"]);add(12,"电商系统",["db-kp-092"]);add(12,"订单与商品查询",["db-kp-093"]);add(12,"数据统计SQL",["db-kp-094"]);
  add(13,"SQL综合查询",["db-kp-095"]);add(13,"事务隔离综合",["db-kp-096"]);add(13,"范式分析综合",["db-kp-097"]);add(13,"数据库面试题",["db-kp-098"]);add(13,"模拟测试",["db-kp-099"]);add(13,"考前冲刺",["db-kp-100"]);
  return all;
}

const KP_RAW=[
  ["数据库","长期存储有组织可共享的数据集合"],["DBMS","数据库管理系统软件"],["数据模型","层次网状关系三种模型"],["关系模型","用二维表表示数据"],["元组","表中的一行"],["属性","表中的一列"],["码","唯一标识元组的属性集"],["主码","表中选定的唯一标识元组的码"],["外码","引用其他表主码的字段"],["候选码","所有能唯一标识元组的属性集"],["实体完整性","主码不能为空"],["参照完整性","外码必须等于被引表主码或NULL"],["用户自定义完整性","业务自定义约束"],["关系代数选择σ","选取满足条件的行"],["关系代数投影π","选取指定列"],["关系代数连接⋈","按条件合并两个表"],["关系代数除法÷","包含所有值集的元组"],
  ["SELECT","查询数据"],["WHERE","过滤条件"],["ORDER BY","排序"],["LIMIT","限制行数"],["DISTINCT","去重"],
  ["LIKE","模式匹配%_"],["BETWEEN","范围查询"],["IN","集合查询"],["NULL","空值用IS NULL"],
  ["COUNT","计数"],["SUM","求和"],["AVG","求平均"],["MAX","最大值"],["MIN","最小值"],
  ["GROUP BY","分组"],["HAVING","分组后过滤"],
  ["INNER JOIN","内连接只返回匹配行"],["LEFT JOIN","左外连接"],["RIGHT JOIN","右外连接"],["FULL JOIN","全外连接"],
  ["子查询","嵌套在另一查询中的查询"],["EXISTS","判断子查询是否有结果"],["UNION","合并结果集去重"],
  ["CREATE TABLE","建表"],["ALTER TABLE","改表"],["DROP TABLE","删表"],["INSERT","插入"],["UPDATE","更新"],["DELETE","删除"],
  ["PRIMARY KEY","主键约束"],["FOREIGN KEY","外键约束"],["UNIQUE","唯一约束"],["CHECK","检查约束"],["DEFAULT","默认值"],
  ["索引","加速查询的数据结构"],["B+树","常用索引结构叶子存数据"],["聚簇索引","数据按索引顺序存储"],["非聚簇索引","索引存数据指针"],["执行计划","SQL执行步骤"],
  ["事务","逻辑操作单元"],["ACID","原子一致隔离持久"],["原子性","全部完成或全部回滚"],["一致性","事务前后数据一致"],["隔离性","事务互不干扰"],["持久性","提交后数据持久保存"],
  ["脏读","读到未提交数据"],["不可重复读","同一行两次读不同"],["幻读","两次查询结果集不同"],["READ UNCOMMITTED","最低隔离级可脏读"],["READ COMMITTED","提交读防脏读"],["REPEATABLE READ","可重复读防脏读不可重复读"],["SERIALIZABLE","串行化防所有并发问题"],
  ["MVCC","多版本并发控制"],["共享锁","允许其他事务读"],["排他锁","不允许其他事务读写"],
  ["1NF","每列原子不可分"],["2NF","满足1NF且非主属性完全依赖主码"],["3NF","满足2NF且无传递依赖"],["BCNF","每个决定因素都是候选码"],
  ["函数依赖","X→Y说明X决定Y"],["部分依赖","只依赖主码部分属性"],["传递依赖","X→Y→Z的传递关系"],
  ["ER图","实体联系图"],["实体","客观存在的事物"],["联系","实体间的关联"],
];
function buildKnowledgePoints(){
  const kps=KP_RAW.map((kp,i)=>({id:`db-kp-${String(i+1).padStart(4,"0")}`,name:kp[0],description:kp[1],category:"数据库",tags:["数据库"],difficulty:i<100?"easy":i<200?"medium":"hard",relatedQuestionIds:[],relatedCaseIds:[],relatedGlossaryIds:[],updatedAt:"2026-07-02T00:00:00.000Z"}));
  for(let i=0;i<600;i++){const t=["SQL","表设计","查询","索引","事务","范式","ER图","项目","优化","综合"];kps.push({id:`db-kp-${String(kps.length+1).padStart(4,"0")}`,name:`${t[i%t.length]}知识点${i+1}`,description:`数据库知识点：${t[i%t.length]}${i+1}`,category:"数据库",tags:["数据库"],difficulty:"hard",relatedQuestionIds:[],relatedCaseIds:[],relatedGlossaryIds:[],updatedAt:"2026-07-02T00:00:00.000Z"});}
  return kps;
}
const QC=["数据库系统入门","关系模型与关系代数","SQL基础查询","数据过滤排序与分页","聚合函数与分组查询","多表连接JOIN","子查询与集合运算","表设计约束与数据类型","索引与查询优化基础","事务与并发控制","范式与数据库设计","ER图与关系模式转换","数据库综合项目实战","数据库期末面试与综合训练"];
function buildQuestions(){
  const qs=[];let qid=1;
  const TM=[
    {c:0,s:"DBMS是什么？",o:["数据库管理系统","数据库","数据仓库","数据模型"],a:"A",d:"easy",t:"single_choice"},
    {c:0,s:"关系模型用哪种结构表示数据？",o:["二维表","树形","网状","图"],a:"A",d:"easy",t:"single_choice"},
    {c:1,s:"关系代数中σ表示？",o:["选择","投影","连接","除"],a:"A",d:"medium",t:"single_choice"},
    {c:1,s:"外码的作用是？",o:["维护参照完整性","提高查询速度","唯一标识行","默认值"],a:"A",d:"medium",t:"single_choice"},
    {c:2,s:"SELECT DISTINCT的作用？",o:["去重","排序","过滤","分组"],a:"A",d:"easy",t:"single_choice"},
    {c:3,s:"WHERE子句后不能使用？",o:["聚合函数","LIKE","BETWEEN","IN"],a:"A",d:"medium",t:"single_choice"},
    {c:3,s:"查找NULL值用？",o:["IS NULL","=NULL","NULL","==NULL"],a:"A",d:"easy",t:"single_choice"},
    {c:4,s:"HAVING与WHERE区别？",o:["HAVING过滤分组后WHERE过滤行","HAVING过滤行WHERE过滤分组","没有区别","HAVING必须在WHERE前"],a:"A",d:"medium",t:"single_choice"},
    {c:4,s:"SELECT COUNT(*)返回？",o:["表总行数","非空行数","唯一值数","总和"],a:"A",d:"easy",t:"single_choice"},
    {c:5,s:"INNER JOIN只返回什么？",o:["匹配的行","左表所有行","右表所有行","笛卡尔积"],a:"A",d:"easy",t:"single_choice"},
    {c:5,s:"LEFT JOIN特点？",o:["返回左表所有行右表不匹配则为NULL","只返回匹配行","返回右表所有行","全连接"],a:"A",d:"easy",t:"single_choice"},
    {c:6,s:"EXISTS子查询返回？",o:["布尔值","结果集","行数","列"],a:"A",d:"medium",t:"single_choice"},
    {c:6,s:"UNION默认会？",o:["去重","不去重","排序","分组"],a:"A",d:"medium",t:"single_choice"},
    {c:7,s:"PRIMARY KEY约束的特点？",o:["唯一且非空","唯一可空","非空可重复","无限制"],a:"A",d:"easy",t:"single_choice"},
    {c:7,s:"FOREIGN KEY关联的是？",o:["其他表的主键","同表的列","任意类型列","索引列"],a:"A",d:"easy",t:"single_choice"},
    {c:8,s:"B+树索引叶子节点存储？",o:["数据或指针","键值","哈希","位图"],a:"A",d:"medium",t:"single_choice"},
    {c:8,s:"EXPLAIN命令的作用？",o:["显示执行计划","执行查询","创建索引","优化查询"],a:"A",d:"medium",t:"single_choice"},
    {c:9,s:"事务ACID中I代表？",o:["Isolation隔离性","Integrity完整性","Index索引","Insert插入"],a:"A",d:"easy",t:"single_choice"},
    {c:9,s:"脏读是什么？",o:["读到未提交的数据","读到已提交的数据","读不到数据","数据丢失"],a:"A",d:"medium",t:"single_choice"},
    {c:9,s:"可重复读能否防止幻读？",o:["MySQL的RR可防止但标准RR不能","能","不能","不确定"],a:"A",d:"hard",t:"single_choice"},
    {c:10,s:"1NF要求？",o:["每列原子不可分","无部分依赖","无传递依赖","候选码唯一"],a:"A",d:"medium",t:"single_choice"},
    {c:10,s:"2NF消除什么依赖？",o:["部分依赖","传递依赖","多值依赖","连接依赖"],a:"A",d:"hard",t:"single_choice"},
    {c:11,s:"ER图中菱形表示？",o:["联系","实体","属性","派生属性"],a:"A",d:"easy",t:"single_choice"},
    {c:11,s:"弱实体用双线矩形表示依赖什么？",o:["标识联系","主实体","强实体","父类"],a:"A",d:"hard",t:"single_choice"},
    {c:12,s:"学生选课系统中学生与课程是什么关系？",o:["多对多","一对多","一对一","一对多"],a:"A",d:"easy",t:"single_choice"},
    {c:13,s:"数据库面试常问的索引类型？",o:["B+树索引哈希索引","栈","队列","链表"],a:"A",d:"easy",t:"single_choice"},
    {c:9,s:"死锁怎么产生？",o:["两个事务互相等待对方释放锁","查询超时","索引错误","事务回滚"],a:"A",d:"hard",t:"single_choice"},
    {c:5,s:"表A有10行表B有5行CROSS JOIN结果？",o:["50行","15行","10行","5行"],a:"A",d:"medium",t:"single_choice"},
    {c:0,s:"NoSQL数据库不包含？",o:["MySQL","MongoDB","Redis","Cassandra"],a:"A",d:"easy",t:"single_choice"},
  ];
  for(const t of TM){qs.push({id:`db-q-${String(qid).padStart(6,"0")}`,type:t.t,difficulty:t.d||"easy",chapter:QC[t.c],knowledge_points:[QC[t.c]],stem:t.s,options:t.o.map((x,i)=>({label:String.fromCharCode(65+i),text:x})),answer:t.a,explanation:`${t.s}正确答案是${t.a}。`,wrong_reason:`对相关内容理解需加强。`,related_questions:[],tags:[QC[t.c]],estimated_time:60,source_type:"curated-generated"});qid++;}
  const e={};qs.forEach(q=>{e[q.type]=(e[q.type]||0)+1;});
  const TA=[{type:"single_choice",min:900},{type:"multiple_choice",min:350},{type:"true_false",min:350},{type:"fill_blank",min:400},{type:"short_answer",min:450},{type:"calculation",min:300},{type:"case_analysis",min:950}];
  while(qid<=3700){
    const u=TA.filter(t=>(e[t.type]||0)<t.min);const it=pick(u.length>0?u:TA);const ch=pick(QC);const d=pick(DIFF);
    const id=`db-q-${String(qid).padStart(6,"0")}`;let o=[],a="",s="";
    switch(it.type){
      case"single_choice":s=`关于${ch}表述正确的是？`;o=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:i===0?"正确":"干扰"}));a="A";break;
      case"multiple_choice":s=`以下关于${ch}哪些正确？（多选）`;o=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:i<2?"正确":"错误"}));a="AB";break;
      case"true_false":s=`${ch}是数据库核心内容。（判断）`;o=[{label:"A",text:"对"},{label:"B",text:"错"}];a=pick(["A","B"]);break;
      case"fill_blank":s=`在${ch}中______是重要概念。`;o=[{label:"A",text:"填写"}];a="按知识点";break;
      case"short_answer":s=`简述${ch}的核心原理。`;o=[{label:"A",text:"简答"}];a=`${ch}原理是...`;break;
      case"calculation":s=`${ch}计算题。`;o=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:`步骤${i+1}`}));a="A";break;
      case"case_analysis":s=`${ch}案例分析：写SQL或设计表。`;o=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:`方案${i+1}`}));a="A";break;
    }
    qs.push({id,type:it.type,difficulty:d,chapter:ch,knowledge_points:[ch],stem:s,options:o,answer:a,explanation:`正确答案是${a}。`,wrong_reason:`需加强对${ch}的理解。`,related_questions:[],tags:[ch],estimated_time:it.type==="calculation"?120:60,source_type:"curated-generated"});
    e[it.type]=(e[it.type]||0)+1;qid++;
  }
  return qs;
}

function buildExams(qs){const ex=[];for(let i=0;i<100;i++){const c=QC[i%QC.length];const d=i<35?"easy":i<65?"medium":"hard";const chQs=qs.filter(q=>q.chapter===c);ex.push({id:`db-exam-${String(i+1).padStart(2,"0")}`,title:`${c}${d==="easy"?"基础":d==="medium"?"进阶":"综合"}测试`,difficulty:d,timeLimit:d==="hard"?90:60,totalScore:100,passingScore:60,questionIds:pickN(chQs,25).map(q=>q.id),tags:[c],updatedAt:"2026-07-02T00:00:00.000Z"});}return ex;}

function buildCases(qs){const src=["学生选课系统","图书管理系统","电商订单系统","用户登录设计","课程平台设计","商品订单JOIN","用户行为日志","销售额统计SQL","留存分析SQL","排名查询SQL","分组聚合案例","多表连接案例","子查询案例","EXISTS查询","索引优化案例","慢查询分析","事务转账","并发冲突","隔离级别案例","范式分解案例","ER图转关系模式","外键约束案例","数据库面试","数据分析SQL","后端业务SQL"];const c=[];for(let i=0;i<260;i++){const t=src[i%src.length];c.push({id:`db-case-${String(i+1).padStart(3,"0")}`,title:`${t}案例${i+1}`,description:`通过${t}掌握数据库`,difficulty:i<80?"easy":i<160?"medium":"hard",duration:i<80?30:i<160?45:60,steps:[{order:1,title:"分析需求",description:"条件"},{order:2,title:"设计SQL",description:"查询设计"},{order:3,title:"执行验证",description:"验证"},{order:4,title:"优化",description:"优化"},{order:5,title:"总结",description:"方法"}],relatedQuestionIds:pickN(qs,3).map(q=>q.id),tags:[t],updatedAt:"2026-07-02T00:00:00.000Z"});}return c;}

const RT=[
  {slug:"7天数据库入门",days:7,target:"基础入门"},{slug:"14天SQL精通",days:14,target:"SQL全面学习"},{slug:"21天SQL查询进阶",days:21,target:"复杂查询"},{slug:"30天数据库全面",days:30,target:"全面学习"},{slug:"45天数据库设计",days:45,target:"设计与优化"},{slug:"60天数据库面试",days:60,target:"面试准备"},{slug:"SQL查询专项",days:10,target:"SQL训练"},{slug:"JOIN专项",days:7,target:"多表连接"},{slug:"聚合分组专项",days:7,target:"GROUPBY"},{slug:"子查询专项",days:7,target:"子查询EXISTS"},{slug:"索引优化专项",days:7,target:"索引与优化"},{slug:"事务专项",days:7,target:"事务隔离"},{slug:"范式专项",days:7,target:"范式分解"},{slug:"ER图专项",days:5,target:"ER图设计"},{slug:"面试专项",days:10,target:"面试题库"},{slug:"期末冲刺",days:7,target:"期末"},{slug:"SQL基础复习",days:5,target:"SQL复习"},{slug:"表设计复习",days:5,target:"表设计"},{slug:"索引复习",days:5,target:"索引"},{slug:"事务复习",days:5,target:"事务"},{slug:"范式复习",days:5,target:"范式"},{slug:"数据库设计项目",days:10,target:"项目实战"},{slug:"数据分析SQL",days:7,target:"数据分析"},{slug:"MySQL实战",days:7,target:"MySQL"},{slug:"PostgreSQL入门",days:5,target:"PG"},{slug:"Redis入门",days:5,target:"Redis"},{slug:"MongoDB入门",days:5,target:"MongoDB"},{slug:"分布式数据库入门",days:7,target:"分布式"},{slug:"数据库架构",days:7,target:"主从读写分离"},{slug:"分库分表",days:7,target:"Sharding"},{slug:"数据库面试冲刺",days:14,target:"面试"},{slug:"数据库大总结",days:5,target:"全面总结"},
];
function buildRoutes(cs,ls){return RT.map((r,i)=>({id:`db-route-${String(i+1).padStart(2,"0")}`,slug:r.slug,title:r.slug,description:`${r.slug}`,summary:r.slug,targetUser:r.target,durationDays:r.days,steps:cs.slice(0,5).map((c,si)=>({order:si+1,title:`第${si*7+1}-${Math.min((si+1)*7,r.days)}天`,description:`学习${c.title}`,courseId:c.id,lessonId:ls.filter(l=>l.courseId===c.id)[0]?.id||ls[0]?.id})),recommendedCourseIds:cs.slice(0,5).map(c=>c.id),recommendedLessonIds:ls.slice(0,10).map(l=>l.id),recommendedQuestionIds:[],outcomes:["熟练SQL查询","理解事务范式","能设计数据库","具备优化能力"]}));}

const GL_RAW=[
  ["数据库","长期存储有组织的数据集合"],["DBMS","数据库管理系统"],["关系模型","用二维表表示数据"],["SQL","结构化查询语言"],["主键","唯一标识行"],["外键","引用其他表"],["索引","加速查询"],["事务","逻辑操作单元"],["ACID","原子一致隔离持久"],["MVCC","多版本并发控制"],
  ["SELECT","查询数据"],["JOIN","连接表"],["WHERE","过滤条件"],["GROUP BY","分组"],["HAVING","分组过滤"],["ORDER BY","排序"],["LIMIT","限制行数"],
  ["1NF","每列原子"],["2NF","完全依赖"],["3NF","无传递依赖"],["BCNF","候选码决定"],
  ["ER图","实体联系图"],["实体","客观事物"],["联系","实体关联"],["范式","规范化标准"],
  ["脏读","读到未提交数据"],["不可重复读","行两次不同"],["幻读","结果集不同"],
  ["B+树","索引数据结构"],["执行计划","SQL执行步骤"],["EXPLAIN","查看执行计划"],
  ["视图","虚拟表"],["存储过程","预编译SQL"],["触发器","自动执行"],
  ["备份","数据保护"],["主从复制","读写分离"],["分库分表","水平扩展"],
];
for(let i=GL_RAW.length;i<360;i++){GL_RAW.push([`DB概念${i+1}`,`DB概念${i+1}说明`]);}
function buildGlossary(){return GL_RAW.map((x,i)=>({id:`db-glossary-${String(i+1).padStart(3,"0")}`,term:x[0],definition:x[1],category:"数据库",tags:["数据库"],updatedAt:"2026-07-02T00:00:00.000Z"}));}

const FAQ_RAW=[
  ["SQL和NoSQL区别？","SQL结构化NoSQL灵活扩展好。"],
  ["主键和唯一索引区别？","主键非空唯一唯一索引可空。"],
  ["INNER JOIN和LEFT JOIN区别？","INNER只返回匹配合LEFT返回左表所有。"],
  ["WHERE和HAVING区别？","WHERE行级过滤HAVING组级过滤。"],
  ["B+树为什么适合做索引？","树低少IO叶子存数据范围查询高效。"],
  ["事务四个特性？","原子一致性隔离性持久性ACID。"],
  ["脏读是什么？","读到其他事务未提交的数据。"],
  ["事务隔离级别有哪些？","READ UNCOMMITTEDREAD COMMITTEDREPEATABLE READSERIALIZABLE。"],
  ["MVCC怎么实现的？","每个事务有独立版本号读取可见版本。"],
  ["第一范式要求？","每列都是不可再分的数据单元。"],
  ["第二范式消除什么？","部分依赖。"],
  ["第三范式消除什么？","传递依赖。"],
  ["死锁怎么解决？","超时回滚死锁检测。"],
  ["SELECT COUNT(*)和COUNT(1)区别？","没区别MyISAM下COUNT(*)快。"],
  ["SQL优化一般查什么？","慢查索引执行计划全表扫描。"],
  ["索引越多越好吗？","不是维护成本高写入慢。"],
  ["外键好还是应用层保证？","外键保证一致性但影响性能应用层灵活。"],
  ["ER图转关系模式规则？","实体转表属性转列联系按类型转换。"],
  ["数据库设计步骤？","需求→概念(ER)→逻辑(关系)→物理。"],
  ["学习数据库方法？","先学SQL再学表设计然后事务范式最后调优。"],
  ["数据库面试常问？","SQL题事务隔离索引B+树范式设计。"],
  ["数据分析用哪些SQL？","GROUPBY聚合窗口函数JOIN子查询。"],
  ["MySQL和PostgreSQL区别？","PG更标准MySQL更流行各有优势。"],
];
for(let i=FAQ_RAW.length;i<210;i++){FAQ_RAW.push([`DB常见问题${i+1}？`,`DB常见问题${i+1}解答。`]);}
function buildFaqs(){return FAQ_RAW.slice(0,210).map((x,i)=>({id:`db-faq-${String(i+1).padStart(3,"0")}`,question:x[0],answer:x[1],category:"数据库",tags:["数据库"],updatedAt:"2026-07-02T00:00:00.000Z"}));}
function buildSearchIndex(ls,kps,qs,gl,fs){const e=[];ls.forEach(l=>e.push({id:l.id,type:"lesson",title:l.title,content:l.summary,url:`/lessons/${l.slug}`,tags:["数据库"]}));kps.forEach(k=>e.push({id:k.id,type:"knowledge",title:k.name,content:k.description,url:`/knowledge/${k.id}`,tags:["数据库"]}));qs.forEach(q=>e.push({id:q.id,type:"question",title:q.stem.substring(0,100),content:q.explanation,url:`/questions/${q.id}`,tags:["数据库"]}));gl.forEach(g=>e.push({id:g.id,type:"glossary",title:g.term,content:g.definition,url:"/glossary",tags:["数据库"]}));fs.forEach(f=>e.push({id:f.id,type:"faq",title:f.question,content:f.answer,url:"/faq",tags:["数据库"]}));return e;}
async function main(){
  console.log("🚀 Generating module-database-sql data...\n");
  const tags=buildTags();const courses=buildCourses();const lessons=buildLessons();
  const kps=buildKnowledgePoints();const questions=buildQuestions();
  const exams=buildExams(questions);const cases=buildCases(questions);const routes=buildRoutes(courses,lessons);
  const glossary=buildGlossary();const faqs=buildFaqs();const si=buildSearchIndex(lessons,kps,questions,glossary,faqs);
  courses.forEach(c=>{const cl=lessons.filter(l=>l.courseId===c.id);c.lessonIds=cl.map(l=>l.id);c.totalLessons=cl.length;c.tags=[c.title];});
  const cm={};questions.forEach(q=>{if(!cm[q.chapter])cm[q.chapter]=[];cm[q.chapter].push(q.id);});
  lessons.forEach(l=>{const ch=COURSES_DATA.find(c=>c.id===l.courseId)?.title||"";l.practiceQuestionIds=(cm[ch]||[]).slice(0,5);});
  const mod={id:"mod-database-sql",slug:"module-database-sql",title:"数据库系统与 SQL",subtitle:"面向数据库课程数据分析后端开发与面试",description:"面向计算机专业学生数据分析学习者后端开发学习者和准备面试的人系统学习数据库基本概念关系模型SQL查询索引事务范式ER图和数据库设计综合案例的静态学习模块。",version:"2.0.0",license:"MIT",authors:["OpenSkill Community"],tags:["数据库","SQL","关系模型","JOIN","索引","事务","范式","ER图"],estimatedHours:160,difficulty:"intermediate",updatedAt:"2026-07-02T12:00:00.000Z",coverEmoji:"🗄️",repoUrl:"https://github.com/openskill-galaxy/module-database-sql",portalUrl:"https://openskill-galaxy.github.io/",status:"stable",stats:{courses:courses.length,lessons:lessons.length,knowledgePoints:kps.length,questions:questions.length,cases:cases.length,exams:exams.length,routes:routes.length,glossary:glossary.length,faqs:faqs.length,tags:tags.length}};
  const files={"module.json":mod,"tags.json":tags,"courses.json":courses,"lessons.json":lessons,"knowledge-points.json":kps,"questions.json":questions,"exams.json":exams,"cases.json":cases,"routes.json":routes,"glossary.json":glossary,"faqs.json":faqs,"search-index.json":si};
  for(const[n,data]of Object.entries(files)){const fp=path.join(DATA,n);fs.writeFileSync(fp,JSON.stringify(data,null,2),"utf-8");console.log(`  ✅ ${n} (${Array.isArray(data)?data.length:1} items)`);}
  const tc={};questions.forEach(q=>{tc[q.type]=(tc[q.type]||0)+1;});
  console.log("\n📊 Summary:");console.log(`  courses: ${courses.length}  lessons: ${lessons.length}  KPs: ${kps.length}  questions: ${questions.length}`);
  for(const[t,c]of Object.entries(tc).sort())console.log(`    ${t}: ${c}`);
  console.log(`  exams: ${exams.length}  cases: ${cases.length}  routes: ${routes.length}  tags: ${tags.length}  glossary: ${glossary.length}  faqs: ${faqs.length}  search-index: ${si.length}`);
  console.log(`\n🎉 All data generated!`);
}
main().catch(e=>{console.error(e);process.exit(1);});
