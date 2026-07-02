import { readFile, stat } from "node:fs/promises";import { join } from "node:path";
const D=join(process.cwd(),"public/data");const o=m=>console.log("  ✅ "+m);const f=m=>{console.error("  ❌ "+m);e.push(m);};const e=[];const u=a=>new Set(a.map(x=>x.id)).size===a.length;
async function L(n){try{const r=await readFile(join(D,n+".json"),"utf8");const d=JSON.parse(r);o(`${n}.json (${Math.round((await stat(join(D,n+".json"))).size/1024)} KB)`);return d;}catch(ex){f(`${n}.json: ${ex.message}`);return null;}}
console.log("\n=== Validate module-database-sql ===\n");
const courses=await L("courses"),lessons=await L("lessons"),kps=await L("knowledge-points"),questions=await L("questions");
const exams=await L("exams"),cases=await L("cases"),routes=await L("routes"),glossary=await L("glossary"),faqs=await L("faqs"),tags=await L("tags"),si=await L("search-index");
console.log("\n--- IDs ---");
for(const[n,a]of[["courses",courses],["lessons",lessons],["knowledge-points",kps],["questions",questions],["exams",exams],["cases",cases],["routes",routes],["glossary",glossary],["faqs",faqs],["tags",tags]]){if(a)if(u(a))o(`${n}: ${a.length} unique`);else f(`${n}: dupes`);}
console.log("\n--- Refs ---");
if(courses&&lessons){const cs=new Set(courses.map(c=>c.id));const ls=new Set(lessons.map(l=>l.courseId));if([...ls].filter(x=>!cs.has(x)).length===0)o("lessons->courseIds OK");else f("orphan lessons");}
if(questions){let mf=0;const R=["id","type","difficulty","chapter","knowledge_points","stem","options","answer","explanation","wrong_reason","tags","estimated_time","source_type"];for(const q of questions){for(const r of R)if(q[r]===undefined){mf++;break;}}if(mf===0)o(`all ${questions.length} questions OK`);else f(`${mf} missing fields`);const nc=questions.filter(q=>q.source_type!=="curated-generated");if(nc.length===0)o("all curated-generated");else f(`${nc.length} not curated`);}
if(exams&&questions){const qd=new Set(questions.map(q=>q.id));let tot=0,bad=0;for(const ex of exams)if(ex.questionIds)for(const qi of ex.questionIds){tot++;if(!qd.has(qi))bad++;}if(bad===0)o(`all ${tot} exam refs OK`);else f(`${bad}/${tot} bad`);}
if(cases&&questions){const qd=new Set(questions.map(q=>q.id));let tot=0,bad=0;for(const c of cases)if(c.relatedQuestionIds)for(const qi of c.relatedQuestionIds){tot++;if(!qd.has(qi))bad++;}if(bad===0)o(`all ${tot} case refs OK`);else f(`${bad}/${tot} bad`);}
console.log("\n--- Search ---");if(si){o(`search-index: ${si.length} entries`);if(si.some(x=>x.type==="lesson")&&si.some(x=>x.type==="question")&&si.some(x=>x.type==="glossary")&&si.some(x=>x.type==="faq"))o("all types");else f("missing types");}else f("missing");
console.log("\n--- Scale ---");
for(const[n,d,m]of[["courses",courses,14],["lessons",lessons,180],["knowledge-points",kps,800],["questions",questions,3500],["exams",exams,100],["cases",cases,260],["routes",routes,30],["tags",tags,350],["glossary",glossary,350],["faqs",faqs,200]]){if(d&&d.length>=m)o(`${n}: ${d.length} >= ${m}`);else if(d)f(`${n}: ${d.length} < ${m}`);else f(`${n}: fail`);}
console.log("\n"+ "=".repeat(50));if(e.length===0){console.log("✅ All passed!\n");process.exit(0);}else{console.log(`❌ ${e.length} errors\n`);process.exit(1);}
