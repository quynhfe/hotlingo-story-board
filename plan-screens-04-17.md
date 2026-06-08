# Plan triển khai các screen chưa làm — HotLingo

Nguồn: `content.md`

Hiện project đã có:

- `Screen01GlobeLanguages`
- `Screen02OpeningHero`
- `Screen03ProblemContext`

Các screen chưa làm: **Screen 04 → Screen 17**.

## Mục tiêu chung

Tiếp tục video HotLingo theo đúng kịch bản trong `content.md`, giữ style hiện tại:

- Background `#FDFEFF`
- Subtle green grid
- Soft pale green radial gradients
- Card trắng bo góc lớn
- Shadow mềm / SaaS product promo
- Primary green `#124F2B`
- Light green `#D7E8DE`
- Accent green `#2F8F5B`
- Teal `#38B2AC`
- Text `#3D4852`
- Muted text `#6B7280`
- Font Be Vietnam Pro hoặc system sans-serif
- Animation bằng `interpolate`, `spring`, `useCurrentFrame`

---

## Phase 1 — Component nền tảng dùng lại

Nên tạo hoặc tái sử dụng các component chung để tránh lặp code.

### Component đề xuất

1. `SceneBackground`
   - Wrap `GridBackground`
   - Thêm pale green radial gradients
   - Dùng chung cho Screen 04–17

2. `PromoCard`
   - Card trắng bo góc, border, shadow
   - Props: `width`, `height`, `children`, `delayFrame`, `rotation`, `zIndex`

3. `TranslationPanel`
   - Dùng cho Screen 06, 07, 08, 09, 10, 12, 17
   - Có source / target / language labels / AI badge

4. `ShortcutBadge`
   - Dùng cho `⌃⌥T`, `Alt + Shift + T`, `Tab`
   - Có pop/glow animation

5. `MockWindow`
   - Dùng cho email, Slack, Word, Telegram, PDF scan

6. `StepFlow`
   - Dùng cho Screen 04
   - Flow: `Copy → Chuyển tab → Paste → Đọc → Quay lại`

7. `FeatureCard`
   - Dùng cho Screen 05, 14, 16

8. `PlatformCard`
   - Dùng cho Screen 15

---

## Screen 04 — Pain Summary

File: `src/scenes/Screen04PainSummary.tsx`

Duration: **120 frames** / 4s

### Nội dung

Text chính:

```text
Công cụ dịch thì có nhiều.
Nhưng luồng làm việc vẫn bị đứt đoạn.
```

Flow phụ:

```text
Copy → Chuyển tab → Paste → Đọc → Quay lại
```

### Visual

- Nền HotLingo giống Screen 03
- 4 card từ Screen 03 tái hiện dạng ghost cards phía sau
- Ghost cards opacity thấp, blur nhẹ, lùi ra sau
- Trung tâm là flow cũ dạng ngang
- Loop arrow xoay nhẹ tạo cảm giác lặp lại mệt mỏi

### Animation

- 0–20f: ghost cards lùi ra sau, blur nhẹ
- 10–45f: text chính hiện từng dòng
- 45–90f: từng step trong flow pop in
- 90–120f: loop arrow xoay nhẹ

---

## Screen 05 — Current Tools / Alternatives

File: `src/scenes/Screen05CurrentTools.tsx`

Duration: **240 frames** / 8s

### Nội dung

Card 1:

```text
Google Translate
Miễn phí, quen thuộc
Nhưng thường phải copy-paste và chuyển tab
```

Card 2:

```text
Browser Translate
Tốt khi đọc website
Nhưng giới hạn ngoài trình duyệt
```

Card 3:

```text
ChatGPT / OCR riêng
Dịch tốt trong nhiều trường hợp
Nhưng workflow bị tách rời
```

Text cuối:

```text
Người dùng không thiếu công cụ dịch.
Họ thiếu một cách dịch liền mạch hơn.
```

### Visual

- 3 comparison cards tone xanh/trắng
- Không dùng màu đỏ mạnh
- Icon code-drawn: translate, browser, AI/OCR
- Text cuối hiện ở giữa, cards mờ nhẹ phía sau

### Animation

- Card 1: 10–30f
- Card 2: 25–45f
- Card 3: 40–60f
- Text cuối: 70–100f
- Cards blur/fade nhẹ khi text cuối xuất hiện

---

## Screen 06 — HotLingo Reveal

File: `src/scenes/Screen06HotLingoReveal.tsx`

Duration: **180 frames** / 6s

### Nội dung

```text
HotLingo
Dịch bất cứ đâu, không rời ứng dụng.
App dịch AI cho người Việt
```

### Visual

- Logo HotLingo ở giữa
- Có thể dùng `src/images/app-icon.png`
- Problem cards / tool cards blur nhẹ phía sau
- Cursor blink nhẹ
- Floating translation panel pop up cạnh cursor

### Animation

- 0–20f: background problem cards fade/blur
- 15–45f: logo scale in
- 35–65f: tagline fade up
- 55–85f: translation panel pop
- 85–180f: hold/floating subtle

---

## Screen 07 — Demo Selection Translate

File: `src/scenes/Screen07DemoSelectionTranslate.tsx`

Duration: **360 frames** / 12s

### Nội dung

Selected text:

```text
Can you review this contract today?
```

Shortcut badge:

```text
⌃⌥T
Alt + Shift + T
```

Panel dịch:

```text
Bạn có thể xem hợp đồng này hôm nay không?
```

Overlay:

```text
Bôi đen text.
Nhấn phím tắt.
Dịch ngay cạnh con trỏ.
```

### Visual

- Mockup email / Slack / Word
- Cursor kéo chọn câu tiếng Anh
- Selection highlight xanh dương nhẹ
- Shortcut badge pop
- Floating panel dịch cạnh vùng chọn

### Animation

- 0–30f: mock window vào
- 30–70f: cursor bôi đen câu
- 70–90f: shortcut badge pop
- 90–130f: translation panel hiện
- 110–170f: text dịch stream
- 170–360f: hold / subtle float

---

## Screen 08 — Demo Floating Translate Button

File: `src/scenes/Screen08FloatingTranslateButton.tsx`

Duration: **210 frames** / 7s

### Nội dung

Overlay:

```text
Không nhớ phím tắt?
Bôi đen text và bấm nút dịch nổi.
```

Button:

```text
Dịch
```

### Visual

- Mock text area
- User bôi đen text
- Nút nổi `Dịch` hiện cạnh selection
- Cursor click button
- Translation panel bật ra

### Animation

- 0–35f: selection
- 35–55f: button scale in
- 55–75f: cursor click button
- 75–120f: panel pop
- 120–210f: hold

---

## Screen 09 — Demo OCR

File: `src/scenes/Screen09DemoOcr.tsx`

Duration: **390 frames** / 13s

### Nội dung

Text trong ảnh/video:

```text
This text cannot be selected.
```

Bản dịch:

```text
Văn bản này không thể bôi đen.
```

Overlay:

```text
Không bôi đen được?
Dùng OCR để dịch ảnh, PDF, phụ đề video.
```

### Visual

- Mockup PDF scan / ảnh / video phụ đề
- Text không thể bôi đen
- Cursor kéo chọn vùng OCR
- Dashed rectangle
- Scanning line chạy từ trên xuống
- Translation panel hiện bên cạnh

### Animation

- 0–35f: mockup vào
- 35–75f: kéo vùng OCR
- 75–115f: scanning line chạy
- 115–160f: panel dịch hiện
- 160–210f: text stream
- 210–390f: hold

---

## Screen 10 — Demo Chat Translation

File: `src/scenes/Screen10DemoChatTranslation.tsx`

Duration: **300 frames** / 10s

### Nội dung

Tin nhắn khách:

```text
Could you send the revised version today?
```

Panel dịch:

```text
Bạn có thể gửi bản chỉnh sửa hôm nay không?
```

Overlay:

```text
Chat với khách nước ngoài
mà không cần rời cuộc trò chuyện.
```

### Visual

- Mock Slack / Telegram / Zalo Work
- Tin nhắn khách pop in
- Cursor bôi đen tin nhắn
- Translation panel hiện cạnh chat

### Animation

- 0–30f: chat window vào
- 30–60f: message pop
- 60–95f: cursor bôi đen
- 95–135f: panel dịch hiện
- 135–210f: stream text
- 210–300f: hold

---

## Screen 11 — Demo Tab-to-Replace

File: `src/scenes/Screen11TabToReplace.tsx`

Duration: **360 frames** / 12s

### Nội dung

Text user nhập:

```text
Mình sẽ gửi bản chỉnh sửa hôm nay.
```

Bản dịch:

```text
I’ll send the revised version today.
```

Overlay:

```text
Gõ tiếng Việt.
Dịch sang tiếng Anh.
Bấm Tab để thay ngay vào email.
```

### Visual

- Email reply input
- Typing Vietnamese text
- Translation panel hiện
- Tab key badge sáng lên
- Text tiếng Việt morph/replace sang English

### Animation

- 0–70f: type Vietnamese
- 70–110f: panel dịch hiện
- 110–140f: Tab key glow
- 140–190f: Vietnamese text morph thành English
- 190–360f: hold

---

## Screen 12 — Google Translate First / AI Enhance

File: `src/scenes/Screen12GoogleAiEnhance.tsx`

Duration: **330 frames** / 11s

### Nội dung

Overlay:

```text
Cần nhanh? Dùng Google Translate miễn phí.
Cần tự nhiên hơn? Enhance with AI.
```

Card phụ:

```text
Google Translate miễn phí
Không cần đăng ký
Không giới hạn
```

### Visual

- Translation panel có 2 chế độ:
  - Google Translate
  - AI Translation
- Google result hiện trước
- Nút `✦ Enhance with AI`
- Click vào, bản dịch AI thay thế bản cũ

### Animation

- 0–40f: Google result appear
- 40–70f: Enhance button pulse
- 70–95f: click
- 95–150f: AI result replaces old text
- 150–330f: hold

---

## Screen 13 — Vocabulary Mode

File: `src/scenes/Screen13VocabularyMode.tsx`

Duration: **360 frames** / 12s

### Nội dung

Selected word:

```text
efficient
```

Panel:

```text
efficient
/ɪˈfɪʃənt/
adjective

hiệu quả, có năng suất tốt
```

Buttons:

```text
🔊 Phát âm
Slow
* Add to vocab
```

Overlay:

```text
Bôi đen 1 từ.
HotLingo biến thành từ điển bỏ túi.
```

### Visual

- Mock bài đọc tiếng nước ngoài
- Highlight từ `efficient`
- Mini dictionary panel
- Pronunciation button pulse nhẹ

### Animation

- 0–35f: article window vào
- 35–65f: word highlight
- 65–105f: dictionary panel pop
- 105–150f: pronunciation icon pulse
- 150–360f: hold

---

## Screen 14 — Credits / No Signup / Pricing

File: `src/scenes/Screen14CreditsPricing.tsx`

Duration: **390 frames** / 13s

### Nội dung

Card 1:

```text
Google Translate miễn phí
Không cần đăng ký
Không giới hạn
```

Card 2:

```text
30 credits AI miễn phí
Mở app là dùng thử
```

Card 3:

```text
Mua thêm khi cần
Không subscription
Credit không hết hạn
```

Text chính:

```text
Thử trước.
Đăng nhập sau nếu thấy hợp.
```

### Visual

- 3 large cards tone xanh/trắng
- Credit icon bay nhẹ
- `Không subscription` highlight xanh

### Animation

- Cards bật lên lần lượt
- Credit icon float
- Highlight text pulse nhẹ

---

## Screen 15 — Platform Support

File: `src/scenes/Screen15PlatformSupport.tsx`

Duration: **240 frames** / 8s

### Nội dung

Card trái:

```text
macOS 13+
Intel & Apple Silicon
```

Card phải:

```text
Windows 10 / 11
x64 & ARM64
```

Text chính:

```text
Dùng được trên macOS và Windows.
```

### Visual

- Hai laptop / desktop mockup cạnh nhau
- macOS card trái
- Windows card phải
- Platform icons SVG/code-drawn

### Animation

- Left mockup trượt từ trái
- Right mockup trượt từ phải
- Icons glow nhẹ
- Text chính fade up

---

## Screen 16 — Use Cases Summary

File: `src/scenes/Screen16UseCasesSummary.tsx`

Duration: **300 frames** / 10s

### Nội dung

Persona cards:

```text
Developer / IT freelancer
Đọc docs, error log, Slack client

Sales / Customer Support
Reply email, hợp đồng, chat khách

Content creator / Translator
Dịch reference, subtitle, video

Sinh viên / Self-learner
Đọc paper, học từ vựng, xem khóa học
```

Text chính:

```text
Cho học tập, công việc
và giao tiếp quốc tế.
```

### Visual

- 4 persona cards grid 2x2
- Icon nhỏ tương ứng:
  - code
  - headset/chat
  - video/subtitle
  - book/student

### Animation

- Persona cards hiện lần lượt
- Icons float/pulse nhẹ
- Text chính xuất hiện phía trên hoặc giữa

---

## Screen 17 — Final Hero CTA

File: `src/scenes/Screen17FinalHeroCta.tsx`

Duration: **300 frames** / 10s

### Nội dung

Text chính:

```text
HotLingo
Dịch bất cứ đâu, không rời ứng dụng.
```

CTA:

```text
Tải về miễn phí
```

URL:

```text
hotlingo.vn
```

Bottom text:

```text
macOS & Windows · Google Translate miễn phí · 30 credits AI không cần đăng ký
```

### Visual

- Logo HotLingo lớn ở giữa
- Floating translation panel bên phải
- CTA button ở giữa
- URL rõ ràng
- Bottom badge nhỏ phía dưới

### Animation

- Logo scale in
- Panel float nhẹ
- CTA button pulse nhẹ
- Kết thúc bằng logo + URL

---

## Update `src/Root.tsx`

Sau khi tạo scenes, import và đăng ký:

```tsx
import { Screen04PainSummary } from "./scenes/Screen04PainSummary";
import { Screen05CurrentTools } from "./scenes/Screen05CurrentTools";
import { Screen06HotLingoReveal } from "./scenes/Screen06HotLingoReveal";
import { Screen07DemoSelectionTranslate } from "./scenes/Screen07DemoSelectionTranslate";
import { Screen08FloatingTranslateButton } from "./scenes/Screen08FloatingTranslateButton";
import { Screen09DemoOcr } from "./scenes/Screen09DemoOcr";
import { Screen10DemoChatTranslation } from "./scenes/Screen10DemoChatTranslation";
import { Screen11TabToReplace } from "./scenes/Screen11TabToReplace";
import { Screen12GoogleAiEnhance } from "./scenes/Screen12GoogleAiEnhance";
import { Screen13VocabularyMode } from "./scenes/Screen13VocabularyMode";
import { Screen14CreditsPricing } from "./scenes/Screen14CreditsPricing";
import { Screen15PlatformSupport } from "./scenes/Screen15PlatformSupport";
import { Screen16UseCasesSummary } from "./scenes/Screen16UseCasesSummary";
import { Screen17FinalHeroCta } from "./scenes/Screen17FinalHeroCta";
```

Frame durations:

| Screen | Seconds | Frames |
|---|---:|---:|
| Screen 04 | 4s | 120 |
| Screen 05 | 8s | 240 |
| Screen 06 | 6s | 180 |
| Screen 07 | 12s | 360 |
| Screen 08 | 7s | 210 |
| Screen 09 | 13s | 390 |
| Screen 10 | 10s | 300 |
| Screen 11 | 12s | 360 |
| Screen 12 | 11s | 330 |
| Screen 13 | 12s | 360 |
| Screen 14 | 13s | 390 |
| Screen 15 | 8s | 240 |
| Screen 16 | 10s | 300 |
| Screen 17 | 10s | 300 |

---

## Thứ tự triển khai đề xuất

### Batch 1 — Problem → Solution transition

1. Screen 04
2. Screen 05
3. Screen 06

### Batch 2 — Core demos

4. Screen 07
5. Screen 08
6. Screen 09
7. Screen 10
8. Screen 11

### Batch 3 — Product explanation

9. Screen 12
10. Screen 13
11. Screen 14

### Batch 4 — Closing

12. Screen 15
13. Screen 16
14. Screen 17

---

## Kiểm tra sau mỗi batch

```bash
npm run lint
```

Kiểm tra visual trong Remotion Studio:

```bash
npm run dev
```
