# Arabic copy lifted from Figma

The Arabic page (`عربي`, `1028:20692`) is a full RTL mirror of the English frame.
This file holds the Arabic strings read **verbatim** through the Figma MCP so far,
with the node each one came from. Nothing here is translated by me; nothing that is
still missing has been guessed.

Status: the Arabic route is **not built yet**. It ships when every string below is
filled in — see "Still to lift".

## Lifted

| Key                    | Arabic                                                                                                                                                                    | Node                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| nav.about              | من نحن                                                                                                                                                                    | `1028:21471`             |
| nav.whyUs              | لماذا نحن                                                                                                                                                                 | `1028:21472`             |
| nav.getApp             | حمّل التطبيق                                                                                                                                                              | `1028:21473`             |
| nav.areas              | أماكن خدماتنا                                                                                                                                                             | `1028:21474`             |
| nav.provider           | كن مقدم خدمة                                                                                                                                                              | `1028:21475`             |
| hero.title             | The Map (left in Latin in the Arabic frame)                                                                                                                               | `I1028:26386;1028:21550` |
| hero.body              | في The Map, رؤيتنا هي تقديم منصة ذكية تساعد الناس على حياة أسهل وأكثر تنظيمًا. هدفنا هو جمع الخدمات الأساسية في مكان واحد، لتوفير الوقت وجعل كل ما تحتاجه في متناول يدك . | `I1028:26386;1028:21552` |
| getApp.badge           | حمّل التطبيق الآن                                                                                                                                                         | `I1029:27994;1028:22349` |
| getApp.subtitle        | ابدأ رحلتك في ثوانٍ واستمتع بكل الخدمات من هاتفك.                                                                                                                         | `1029:27819`             |
| getApp.step1.title     | اختر متجرك                                                                                                                                                                | `1030:24632`             |
| getApp.step1.body      | اختر المتجر المناسب لهاتفك لتحميل التطبيق                                                                                                                                 | `1030:24633`             |
| areas.title            | مناطق الخدمة                                                                                                                                                              | `1028:22390`             |
| areas.subtitle         | تعرف على المناطق التي تغطيها خدماتنا بالقرب منك.                                                                                                                          | `1028:20713`             |
| areas.placeholder      | ابحث بحسب منطقتك                                                                                                                                                          | `1028:22405`             |
| areas.cta              | تحقق من التوافر                                                                                                                                                           | `I1028:20715;942:20400`  |
| reviews.subheading     | تجارب حقيقية من مستخدمين فعليين تعكس جودة خدماتنا وتساعدك على اتخاذ قرارك بثقة.                                                                                           | `1028:20722`             |
| footer.tagline         | طريقتك الذكية لاستكشاف كل ما حولك. تجربة أسرع وأكثر وضوحًا لتصل إلى ما تحتاجه بثقة.                                                                                       | `1028:20755`             |
| footer.downloadHeading | حمّل تطبيق TheMap لأجهزة iOS وAndroid                                                                                                                                     | `1028:20757`             |
| footer.socialHeading   | ابقَ على تواصل معنا                                                                                                                                                       | `1028:20762`             |

## Still to lift

| Key                                                                               | Where it lives                                                                 |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| whyChoose.title and the five feature labels                                       | `1029:27728` (Why Choose Us Arabic)                                            |
| getApp.step2 / step3 title and body                                               | the Arabic stepper's other variants under `1030:24656`                         |
| provider.* — badge, body, email card, download heading, five benefit pills        | `1030:23332` (Contact us Arabic)                                               |
| reviews.heading — the Arabic frame renders it mid-typewriter as "ثقة مبنية على ت" | the last variant of the Arabic `Trust Built on Real Reviews` set, `1015:21030` |
| reviews items — the reviewers' Arabic names and quotes                            | `1030:24297` (Real Reviews Arabic)                                             |

## Note on the Arabic typeface

The Arabic frames inherit `Baloo 2`, which has no Arabic glyphs. Baloo Bhaijaan 2
was approved as the Arabic face in Phase 2 and is already loaded and wired to the
`font-arabic` token, so the Arabic page has a typeface waiting for it.
