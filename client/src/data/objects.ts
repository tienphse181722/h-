// Định nghĩa các sự vật/hiện tượng để người dùng nhận thức
export interface Characteristic {
  id: string
  text: string
  icon: string
  isCorrect: boolean // true = đặc điểm đúng, false = nhiễu
  type?: 'sensory' | 'rational' | 'practical' // Loại đặc điểm (optional)
  // sensory: cảm quan (nhìn, nghe, sờ, ngửi...)
  // rational: lý tính (phân tích, suy luận, bản chất...)
  // practical: thực tiễn (hành động, kiểm chứng...)
}

export interface GameObject {
  id: string
  name: string // Tên sự vật (chỉ hiện ở cuối)
  image: string // Emoji đại diện
  description: string // Mô tả ngắn
  characteristics: Characteristic[] // 10-12 đặc điểm (5 đúng, 5-7 nhiễu)
  category: string // Loại: động vật, thực vật, đồ vật, v.v.
  correctGuess: string // Đáp án đúng khi đoán
  wrongGuesses: string[] // Các đáp án sai
  verificationAction: {
    correct: string
    incorrect: string[]
  }
}

// Pool đặc điểm nhiễu chung - sẽ được thêm ngẫu nhiên vào mỗi object
const commonDistractors: Characteristic[] = [
  // Sensory distractors
  { id: 'cd1', text: 'Có màu hồng', icon: '🩷', isCorrect: false, type: 'sensory' },
  { id: 'cd2', text: 'Có mùi thơm', icon: '👃', isCorrect: false, type: 'sensory' },
  { id: 'cd3', text: 'Rất nặng', icon: '⚖️', isCorrect: false, type: 'sensory' },
  { id: 'cd4', text: 'Rất nhẹ', icon: '🪶', isCorrect: false, type: 'sensory' },
  { id: 'cd5', text: 'Có bánh xe', icon: '⚙️', isCorrect: false, type: 'sensory' },
  { id: 'cd6', text: 'Có nút bấm', icon: '🔘', isCorrect: false, type: 'sensory' },
  { id: 'cd7', text: 'Phát sáng', icon: '💡', isCorrect: false, type: 'sensory' },
  { id: 'cd8', text: 'Trong suốt', icon: '💎', isCorrect: false, type: 'sensory' },
  { id: 'cd9', text: 'Có mùi hôi', icon: '🤢', isCorrect: false, type: 'sensory' },
  { id: 'cd10', text: 'Rất lớn', icon: '📏', isCorrect: false, type: 'sensory' },
  { id: 'cd11', text: 'Rất nhỏ', icon: '🔬', isCorrect: false, type: 'sensory' },
  { id: 'cd12', text: 'Có vân', icon: '🌀', isCorrect: false, type: 'sensory' },
  
  // Rational distractors
  { id: 'cd13', text: 'Làm từ kim loại', icon: '🔩', isCorrect: false, type: 'rational' },
  { id: 'cd14', text: 'Làm từ nhựa', icon: '♻️', isCorrect: false, type: 'rational' },
  { id: 'cd15', text: 'Sản xuất ở nhà máy', icon: '🏭', isCorrect: false, type: 'rational' },
  { id: 'cd16', text: 'Mọc tự nhiên', icon: '🌱', isCorrect: false, type: 'rational' },
  { id: 'cd17', text: 'Cần điện', icon: '⚡', isCorrect: false, type: 'rational' },
  { id: 'cd18', text: 'Cần nước', icon: '💧', isCorrect: false, type: 'rational' },
  { id: 'cd19', text: 'Có giá trị cao', icon: '💰', isCorrect: false, type: 'rational' },
  { id: 'cd20', text: 'Rất phổ biến', icon: '⭐', isCorrect: false, type: 'rational' },
  { id: 'cd21', text: 'Rất hiếm', icon: '💎', isCorrect: false, type: 'rational' },
  { id: 'cd22', text: 'Có thể hỏng', icon: '⚠️', isCorrect: false, type: 'rational' },
  
  // Practical distractors
  { id: 'cd23', text: 'Có thể mở được', icon: '🔓', isCorrect: false, type: 'practical' },
  { id: 'cd24', text: 'Có thể đóng lại', icon: '🔒', isCorrect: false, type: 'practical' },
  { id: 'cd25', text: 'Có thể gấp lại', icon: '📋', isCorrect: false, type: 'practical' },
  { id: 'cd26', text: 'Có thể bơm hơi', icon: '💨', isCorrect: false, type: 'practical' },
  { id: 'cd27', text: 'Có thể sạc pin', icon: '🔋', isCorrect: false, type: 'practical' },
  { id: 'cd28', text: 'Có thể rửa sạch', icon: '🧼', isCorrect: false, type: 'practical' },
  { id: 'cd29', text: 'Có thể đốt cháy', icon: '🔥', isCorrect: false, type: 'practical' },
  { id: 'cd30', text: 'Có thể tái chế', icon: '♻️', isCorrect: false, type: 'practical' },
  { id: 'cd31', text: 'Có thể sửa chữa', icon: '🔧', isCorrect: false, type: 'practical' },
  { id: 'cd32', text: 'Có thể nâng cấp', icon: '⬆️', isCorrect: false, type: 'practical' }
]

// Hàm thêm đặc điểm nhiễu ngẫu nhiên
function addRandomDistractors(characteristics: Characteristic[], count: number = 10): Characteristic[] {
  const shuffled = [...commonDistractors].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)
  return [...characteristics, ...selected]
}

export const gameObjects: GameObject[] = [
  // ĐỘNG VẬT
  {
    id: 'dog',
    name: 'Con chó',
    image: '🐕',
    description: 'Một sinh vật bốn chân...',
    characteristics: [
      // SENSORY - Cảm quan (thêm nhiều hơn)
      { id: 'c1', text: 'Có 4 chân', icon: '🦵', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Có đuôi vẫy', icon: '〰️', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Kêu "gâu gâu"', icon: '🔊', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Có bộ lông', icon: '🧶', isCorrect: true, type: 'sensory' },
      { id: 'c11', text: 'Có mũi ướt', icon: '👃', isCorrect: true, type: 'sensory' },
      { id: 'c12', text: 'Có răng nanh', icon: '🦷', isCorrect: true, type: 'sensory' },
      { id: 'c13', text: 'Có tai dài', icon: '👂', isCorrect: true, type: 'sensory' },
      { id: 'c14', text: 'Có móng chân', icon: '🐾', isCorrect: true, type: 'sensory' },
      // RATIONAL - Lý tính (thêm nhiều hơn)
      { id: 'c5', text: 'Là động vật có vú', icon: '🐾', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Ăn thịt và xương', icon: '🍖', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Rất trung thành', icon: '❤️', isCorrect: true, type: 'rational' },
      { id: 'c15', text: 'Có khứu giác nhạy', icon: '👃', isCorrect: true, type: 'rational' },
      { id: 'c16', text: 'Sống thành bầy', icon: '👥', isCorrect: true, type: 'rational' },
      { id: 'c17', text: 'Thích chơi đùa', icon: '🎾', isCorrect: true, type: 'rational' },
      { id: 'c18', text: 'Bảo vệ chủ nhân', icon: '🛡️', isCorrect: true, type: 'rational' },
      // PRACTICAL - Thực tiễn (thêm nhiều hơn)
      { id: 'c8', text: 'Có thể dạy ngồi, nằm', icon: '🎓', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể nuôi trong nhà', icon: '🏠', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể dắt đi dạo', icon: '🦮', isCorrect: true, type: 'practical' },
      { id: 'c19', text: 'Có thể cho ăn thức ăn khô', icon: '🍖', isCorrect: true, type: 'practical' },
      { id: 'c20', text: 'Có thể tắm rửa', icon: '🛁', isCorrect: true, type: 'practical' },
      { id: 'c21', text: 'Có thể chơi ném bóng', icon: '🎾', isCorrect: true, type: 'practical' },
      { id: 'c22', text: 'Có thể canh nhà', icon: '🏠', isCorrect: true, type: 'practical' },
      // NHIỄU - Sensory (thêm nhiều hơn)
      { id: 'n1', text: 'Biết bay', icon: '🦅', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Sống dưới nước', icon: '🌊', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Có vảy', icon: '🐠', isCorrect: false, type: 'sensory' },
      { id: 'n8', text: 'Có cánh', icon: '🪽', isCorrect: false, type: 'sensory' },
      { id: 'n9', text: 'Có vỏ cứng', icon: '🐚', isCorrect: false, type: 'sensory' },
      { id: 'n10', text: 'Màu xanh lá', icon: '🟢', isCorrect: false, type: 'sensory' },
      { id: 'n11', text: 'Có sừng nhọn', icon: '🦌', isCorrect: false, type: 'sensory' },
      { id: 'n12', text: 'Có vòi dài', icon: '🐘', isCorrect: false, type: 'sensory' },
      { id: 'n19', text: 'Kêu "meo meo"', icon: '🔊', isCorrect: false, type: 'sensory' },
      { id: 'n20', text: 'Có móng vuốt sắc', icon: '🔪', isCorrect: false, type: 'sensory' },
      { id: 'n23', text: 'Có mỏ nhọn', icon: '🦆', isCorrect: false, type: 'sensory' },
      { id: 'n24', text: 'Có vây bơi', icon: '🦈', isCorrect: false, type: 'sensory' },
      { id: 'n25', text: 'Có 6 chân', icon: '🐜', isCorrect: false, type: 'sensory' },
      { id: 'n26', text: 'Có 8 chân', icon: '🕷️', isCorrect: false, type: 'sensory' },
      { id: 'n27', text: 'Có vỏ mai', icon: '🐢', isCorrect: false, type: 'sensory' },
      { id: 'n28', text: 'Có râu dài', icon: '😺', isCorrect: false, type: 'sensory' },
      { id: 'n29', text: 'Có túi bụng', icon: '🦘', isCorrect: false, type: 'sensory' },
      { id: 'n30', text: 'Có gai nhọn', icon: '🦔', isCorrect: false, type: 'sensory' },
      // NHIỄU - Rational (thêm nhiều hơn)
      { id: 'n4', text: 'Là thực vật', icon: '🌿', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Là đồ vật', icon: '📦', isCorrect: false, type: 'rational' },
      { id: 'n13', text: 'Ăn cỏ', icon: '🌾', isCorrect: false, type: 'rational' },
      { id: 'n14', text: 'Đẻ trứng', icon: '🥚', isCorrect: false, type: 'rational' },
      { id: 'n15', text: 'Sống trên cây', icon: '🏞️', isCorrect: false, type: 'rational' },
      { id: 'n21', text: 'Thích săn chuột', icon: '🐭', isCorrect: false, type: 'rational' },
      { id: 'n31', text: 'Sống một mình', icon: '🐆', isCorrect: false, type: 'rational' },
      { id: 'n32', text: 'Ngủ ban ngày', icon: '🦉', isCorrect: false, type: 'rational' },
      { id: 'n33', text: 'Ăn côn trùng', icon: '🐛', isCorrect: false, type: 'rational' },
      { id: 'n34', text: 'Sống dưới đất', icon: '🐹', isCorrect: false, type: 'rational' },
      { id: 'n35', text: 'Thích leo trèo', icon: '🐒', isCorrect: false, type: 'rational' },
      { id: 'n36', text: 'Ngủ đông', icon: '🐻', isCorrect: false, type: 'rational' },
      { id: 'n37', text: 'Thích ẩn náu', icon: '🦎', isCorrect: false, type: 'rational' },
      { id: 'n38', text: 'Sống ở sa mạc', icon: '🐪', isCorrect: false, type: 'rational' },
      // NHIỄU - Practical (thêm nhiều hơn)
      { id: 'n6', text: 'Có thể cắm sạc', icon: '🔌', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể lái được', icon: '🏎️', isCorrect: false, type: 'practical' },
      { id: 'n16', text: 'Có thể ăn được', icon: '🍽️', isCorrect: false, type: 'practical' },
      { id: 'n17', text: 'Có thể đọc được', icon: '📖', isCorrect: false, type: 'practical' },
      { id: 'n18', text: 'Có thể uống được', icon: '🥤', isCorrect: false, type: 'practical' },
      { id: 'n22', text: 'Có thể vuốt ve', icon: '✋', isCorrect: false, type: 'practical' },
      { id: 'n39', text: 'Có thể cưỡi được', icon: '🏇', isCorrect: false, type: 'practical' },
      { id: 'n40', text: 'Có thể vắt sữa', icon: '🥛', isCorrect: false, type: 'practical' },
      { id: 'n41', text: 'Có thể hái được', icon: '🌳', isCorrect: false, type: 'practical' },
      { id: 'n42', text: 'Có thể trồng được', icon: '🌱', isCorrect: false, type: 'practical' },
      { id: 'n43', text: 'Có thể bật công tắc', icon: '💡', isCorrect: false, type: 'practical' },
      { id: 'n44', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' },
      { id: 'n45', text: 'Có thể mở khóa', icon: '🔑', isCorrect: false, type: 'practical' },
      { id: 'n46', text: 'Có thể nấu ăn', icon: '🍳', isCorrect: false, type: 'practical' }
    ],
    category: 'Động vật',
    correctGuess: 'Con chó',
    wrongGuesses: ['Con mèo', 'Con sói', 'Con cáo', 'Con chó sói', 'Con gấu'],
    verificationAction: {
      correct: 'Cho ăn thịt và xem phản ứng',
      incorrect: ['Cho ăn xương và xem phản ứng', 'Cho sủa và xem giọng', 'Dắt đi dạo và xem cách đi']
    }
  },
  {
    id: 'cat',
    name: 'Con mèo',
    image: '🐈',
    description: 'Một sinh vật nhỏ nhắn...',
    characteristics: [
      // SENSORY - Cảm quan
      { id: 'c1', text: 'Có 4 chân', icon: '🦵', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Kêu "meo meo"', icon: '🔊', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Có móng vuốt sắc', icon: '🔪', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Có bộ lông mềm', icon: '🧶', isCorrect: true, type: 'sensory' },
      { id: 'c11', text: 'Có râu dài', icon: '😺', isCorrect: true, type: 'sensory' },
      { id: 'c12', text: 'Có đuôi dài', icon: '〰️', isCorrect: true, type: 'sensory' },
      { id: 'c13', text: 'Có mắt sáng', icon: '👁️', isCorrect: true, type: 'sensory' },
      { id: 'c14', text: 'Có tai nhọn', icon: '👂', isCorrect: true, type: 'sensory' },
      // RATIONAL - Lý tính
      { id: 'c5', text: 'Là động vật có vú', icon: '🐾', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Thích săn chuột', icon: '🐭', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Ăn thịt và cá', icon: '🍖', isCorrect: true, type: 'rational' },
      { id: 'c15', text: 'Sống độc lập', icon: '🐆', isCorrect: true, type: 'rational' },
      { id: 'c16', text: 'Thích leo trèo', icon: '🐒', isCorrect: true, type: 'rational' },
      { id: 'c17', text: 'Ngủ nhiều', icon: '😴', isCorrect: true, type: 'rational' },
      { id: 'c18', text: 'Thích ẩn náu', icon: '🦎', isCorrect: true, type: 'rational' },
      // PRACTICAL - Thực tiễn
      { id: 'c8', text: 'Có thể vuốt ve', icon: '✋', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể nuôi trong nhà', icon: '🏠', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể cho ăn cá', icon: '🐠', isCorrect: true, type: 'practical' },
      { id: 'c19', text: 'Có thể cho ăn thức ăn khô', icon: '🍖', isCorrect: true, type: 'practical' },
      { id: 'c20', text: 'Có thể tắm rửa', icon: '🛁', isCorrect: true, type: 'practical' },
      { id: 'c21', text: 'Có thể chơi với đồ chơi', icon: '🎾', isCorrect: true, type: 'practical' },
      { id: 'c22', text: 'Có thể dạy vệ sinh', icon: '🚽', isCorrect: true, type: 'practical' },
      // NHIỄU - Sensory
      { id: 'n1', text: 'Kêu "gâu gâu"', icon: '🔊', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có vảy', icon: '🐠', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Biết bay', icon: '🦅', isCorrect: false, type: 'sensory' },
      { id: 'n8', text: 'Có đuôi vẫy mạnh', icon: '〰️', isCorrect: false, type: 'sensory' },
      { id: 'n9', text: 'Có tai dài', icon: '👂', isCorrect: false, type: 'sensory' },
      { id: 'n19', text: 'Có mũi ướt', icon: '👃', isCorrect: false, type: 'sensory' },
      { id: 'n20', text: 'Có răng nanh', icon: '🦷', isCorrect: false, type: 'sensory' },
      { id: 'n23', text: 'Có mỏ nhọn', icon: '🦆', isCorrect: false, type: 'sensory' },
      { id: 'n24', text: 'Có vây bơi', icon: '🦈', isCorrect: false, type: 'sensory' },
      { id: 'n25', text: 'Có 6 chân', icon: '🐜', isCorrect: false, type: 'sensory' },
      { id: 'n26', text: 'Có 8 chân', icon: '🕷️', isCorrect: false, type: 'sensory' },
      { id: 'n27', text: 'Có vỏ mai', icon: '🐢', isCorrect: false, type: 'sensory' },
      { id: 'n28', text: 'Có túi bụng', icon: '🦘', isCorrect: false, type: 'sensory' },
      { id: 'n29', text: 'Có gai nhọn', icon: '🦔', isCorrect: false, type: 'sensory' },
      { id: 'n30', text: 'Có sừng nhọn', icon: '🦌', isCorrect: false, type: 'sensory' },
      { id: 'n31', text: 'Có vòi dài', icon: '🐘', isCorrect: false, type: 'sensory' },
      { id: 'n32', text: 'Có cánh', icon: '🪽', isCorrect: false, type: 'sensory' },
      { id: 'n33', text: 'Có vỏ cứng', icon: '🐚', isCorrect: false, type: 'sensory' },
      { id: 'n34', text: 'Màu xanh lá', icon: '🟢', isCorrect: false, type: 'sensory' },
      // NHIỄU - Rational
      { id: 'n4', text: 'Là thực vật', icon: '🌿', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Sống dưới nước', icon: '🌊', isCorrect: false, type: 'rational' },
      { id: 'n10', text: 'Rất trung thành', icon: '❤️', isCorrect: false, type: 'rational' },
      { id: 'n11', text: 'Ăn cỏ', icon: '🌾', isCorrect: false, type: 'rational' },
      { id: 'n13', text: 'Đẻ trứng', icon: '🥚', isCorrect: false, type: 'rational' },
      { id: 'n14', text: 'Sống trên cây', icon: '🏞️', isCorrect: false, type: 'rational' },
      { id: 'n15', text: 'Sống thành bầy', icon: '👥', isCorrect: false, type: 'rational' },
      { id: 'n35', text: 'Thích chơi đùa', icon: '🎾', isCorrect: false, type: 'rational' },
      { id: 'n36', text: 'Bảo vệ chủ nhân', icon: '🛡️', isCorrect: false, type: 'rational' },
      { id: 'n37', text: 'Có khứu giác nhạy', icon: '👃', isCorrect: false, type: 'rational' },
      { id: 'n38', text: 'Sống dưới đất', icon: '🐹', isCorrect: false, type: 'rational' },
      { id: 'n39', text: 'Ngủ đông', icon: '🐻', isCorrect: false, type: 'rational' },
      { id: 'n40', text: 'Sống ở sa mạc', icon: '🐪', isCorrect: false, type: 'rational' },
      { id: 'n41', text: 'Ăn côn trùng', icon: '🐛', isCorrect: false, type: 'rational' },
      // NHIỄU - Practical
      { id: 'n6', text: 'Có thể lái được', icon: '🏎️', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể cắm sạc', icon: '🔌', isCorrect: false, type: 'practical' },
      { id: 'n12', text: 'Có thể dắt đi dạo', icon: '🦮', isCorrect: false, type: 'practical' },
      { id: 'n16', text: 'Có thể ăn được', icon: '🍽️', isCorrect: false, type: 'practical' },
      { id: 'n17', text: 'Có thể đọc được', icon: '📖', isCorrect: false, type: 'practical' },
      { id: 'n18', text: 'Có thể uống được', icon: '🥤', isCorrect: false, type: 'practical' },
      { id: 'n42', text: 'Có thể cưỡi được', icon: '🏇', isCorrect: false, type: 'practical' },
      { id: 'n43', text: 'Có thể vắt sữa', icon: '🥛', isCorrect: false, type: 'practical' },
      { id: 'n44', text: 'Có thể hái được', icon: '🌳', isCorrect: false, type: 'practical' },
      { id: 'n45', text: 'Có thể trồng được', icon: '🌱', isCorrect: false, type: 'practical' },
      { id: 'n46', text: 'Có thể bật công tắc', icon: '💡', isCorrect: false, type: 'practical' },
      { id: 'n47', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' },
      { id: 'n48', text: 'Có thể dạy ngồi, nằm', icon: '🎓', isCorrect: false, type: 'practical' },
      { id: 'n49', text: 'Có thể canh nhà', icon: '🏠', isCorrect: false, type: 'practical' }
    ],
    category: 'Động vật',
    correctGuess: 'Con mèo',
    wrongGuesses: ['Con chó', 'Con cáo', 'Con thỏ', 'Con sóc', 'Con chồn'],
    verificationAction: {
      correct: 'Cho một con chuột đồ chơi và xem phản ứng',
      incorrect: ['Cho ăn cá và xem phản ứng', 'Vuốt ve và xem phản ứng', 'Cho leo cây và quan sát']
    }
  },
  {
    id: 'bird',
    name: 'Con chim',
    image: '🐦',
    description: 'Một sinh vật có cánh...',
    characteristics: [
      // SENSORY - Cảm quan
      { id: 'c1', text: 'Có cánh', icon: '🪽', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Có mỏ nhọn', icon: '🦆', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Có lông vũ', icon: '🪶', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Nhỏ nhắn', icon: '📏', isCorrect: true, type: 'sensory' },
      { id: 'c11', text: 'Có 2 chân', icon: '🦵', isCorrect: true, type: 'sensory' },
      { id: 'c12', text: 'Có móng vuốt', icon: '🔪', isCorrect: true, type: 'sensory' },
      { id: 'c13', text: 'Có đuôi lông', icon: '〰️', isCorrect: true, type: 'sensory' },
      { id: 'c14', text: 'Kêu hót', icon: '🔊', isCorrect: true, type: 'sensory' },
      // RATIONAL - Lý tính
      { id: 'c5', text: 'Biết bay', icon: '✈️', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Đẻ trứng', icon: '🥚', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Sống trên cây', icon: '🏞️', isCorrect: true, type: 'rational' },
      { id: 'c15', text: 'Làm tổ', icon: '🏠', isCorrect: true, type: 'rational' },
      { id: 'c16', text: 'Ăn hạt và sâu', icon: '🌾', isCorrect: true, type: 'rational' },
      { id: 'c17', text: 'Có xương rỗng', icon: '🦴', isCorrect: true, type: 'rational' },
      { id: 'c18', text: 'Thích hót vào sáng', icon: '🌅', isCorrect: true, type: 'rational' },
      // PRACTICAL - Thực tiễn
      { id: 'c8', text: 'Có thể cho ăn hạt', icon: '🌾', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể nuôi trong lồng', icon: '🏠', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể thả bay', icon: '✈️', isCorrect: true, type: 'practical' },
      { id: 'c19', text: 'Có thể dạy hót', icon: '🎵', isCorrect: true, type: 'practical' },
      { id: 'c20', text: 'Có thể cho tắm', icon: '💧', isCorrect: true, type: 'practical' },
      { id: 'c21', text: 'Có thể quan sát bay', icon: '👁️', isCorrect: true, type: 'practical' },
      { id: 'c22', text: 'Có thể cho ăn sâu', icon: '🐛', isCorrect: true, type: 'practical' },
      // NHIỄU - Sensory
      { id: 'n1', text: 'Có 4 chân', icon: '🦵', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có vảy', icon: '🐠', isCorrect: false, type: 'sensory' },
      { id: 'n8', text: 'Có bộ lông', icon: '🧶', isCorrect: false, type: 'sensory' },
      { id: 'n9', text: 'Kêu "meo meo"', icon: '🔊', isCorrect: false, type: 'sensory' },
      { id: 'n19', text: 'Kêu "gâu gâu"', icon: '🔊', isCorrect: false, type: 'sensory' },
      { id: 'n20', text: 'Có móng vuốt sắc', icon: '🔪', isCorrect: false, type: 'sensory' },
      { id: 'n23', text: 'Có vây bơi', icon: '🦈', isCorrect: false, type: 'sensory' },
      { id: 'n24', text: 'Có 6 chân', icon: '🐜', isCorrect: false, type: 'sensory' },
      { id: 'n25', text: 'Có 8 chân', icon: '🕷️', isCorrect: false, type: 'sensory' },
      { id: 'n26', text: 'Có vỏ mai', icon: '🐢', isCorrect: false, type: 'sensory' },
      { id: 'n27', text: 'Có râu dài', icon: '😺', isCorrect: false, type: 'sensory' },
      { id: 'n28', text: 'Có túi bụng', icon: '🦘', isCorrect: false, type: 'sensory' },
      { id: 'n29', text: 'Có gai nhọn', icon: '🦔', isCorrect: false, type: 'sensory' },
      { id: 'n30', text: 'Có sừng nhọn', icon: '🦌', isCorrect: false, type: 'sensory' },
      { id: 'n31', text: 'Có vòi dài', icon: '🐘', isCorrect: false, type: 'sensory' },
      { id: 'n32', text: 'Có vỏ cứng', icon: '🐚', isCorrect: false, type: 'sensory' },
      { id: 'n33', text: 'Màu xanh lá', icon: '🟢', isCorrect: false, type: 'sensory' },
      { id: 'n34', text: 'Có đuôi vẫy', icon: '〰️', isCorrect: false, type: 'sensory' },
      // NHIỄU - Rational
      { id: 'n3', text: 'Sống dưới nước', icon: '🌊', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Là thực vật', icon: '🌿', isCorrect: false, type: 'rational' },
      { id: 'n10', text: 'Là động vật có vú', icon: '🐾', isCorrect: false, type: 'rational' },
      { id: 'n11', text: 'Ăn thịt', icon: '🍖', isCorrect: false, type: 'rational' },
      { id: 'n13', text: 'Ăn cỏ', icon: '🌾', isCorrect: false, type: 'rational' },
      { id: 'n14', text: 'Thích săn chuột', icon: '🐭', isCorrect: false, type: 'rational' },
      { id: 'n15', text: 'Sống thành bầy', icon: '👥', isCorrect: false, type: 'rational' },
      { id: 'n35', text: 'Thích leo trèo', icon: '🐒', isCorrect: false, type: 'rational' },
      { id: 'n36', text: 'Ngủ đông', icon: '🐻', isCorrect: false, type: 'rational' },
      { id: 'n37', text: 'Sống dưới đất', icon: '🐹', isCorrect: false, type: 'rational' },
      { id: 'n38', text: 'Sống ở sa mạc', icon: '🐪', isCorrect: false, type: 'rational' },
      { id: 'n39', text: 'Rất trung thành', icon: '❤️', isCorrect: false, type: 'rational' },
      { id: 'n40', text: 'Thích ẩn náu', icon: '🦎', isCorrect: false, type: 'rational' },
      // NHIỄU - Practical
      { id: 'n5', text: 'Có thể lái', icon: '🏎️', isCorrect: false, type: 'practical' },
      { id: 'n6', text: 'Có thể cắm sạc', icon: '🔌', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể ăn được', icon: '🍽️', isCorrect: false, type: 'practical' },
      { id: 'n12', text: 'Có thể vuốt ve', icon: '✋', isCorrect: false, type: 'practical' },
      { id: 'n16', text: 'Có thể đọc được', icon: '📖', isCorrect: false, type: 'practical' },
      { id: 'n17', text: 'Có thể uống được', icon: '🥤', isCorrect: false, type: 'practical' },
      { id: 'n18', text: 'Có thể dắt đi dạo', icon: '🦮', isCorrect: false, type: 'practical' },
      { id: 'n41', text: 'Có thể cưỡi được', icon: '🏇', isCorrect: false, type: 'practical' },
      { id: 'n42', text: 'Có thể vắt sữa', icon: '🥛', isCorrect: false, type: 'practical' },
      { id: 'n43', text: 'Có thể hái được', icon: '🌳', isCorrect: false, type: 'practical' },
      { id: 'n44', text: 'Có thể trồng được', icon: '🌱', isCorrect: false, type: 'practical' },
      { id: 'n45', text: 'Có thể bật công tắc', icon: '💡', isCorrect: false, type: 'practical' },
      { id: 'n46', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' }
    ],
    category: 'Động vật',
    correctGuess: 'Con chim',
    wrongGuesses: ['Con bướm', 'Con dơi', 'Con chuồn chuồn', 'Con ong', 'Con chim bồ câu'],
    verificationAction: {
      correct: 'Thả lên không trung và xem có bay không',
      incorrect: ['Cho ăn hạt và xem phản ứng', 'Nghe tiếng hót và nhận biết', 'Xem màu lông và xác định']
    }
  },
  {
    id: 'fish',
    name: 'Con cá',
    image: '🐟',
    description: 'Một sinh vật dưới nước...',
    characteristics: [
      // SENSORY - Cảm quan
      { id: 'c1', text: 'Có vảy', icon: '🐠', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Có vây bơi', icon: '🦈', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Ướt át', icon: '💧', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Trơn trượt', icon: '〰️', isCorrect: true, type: 'sensory' },
      { id: 'c11', text: 'Có mắt to', icon: '👁️', isCorrect: true, type: 'sensory' },
      { id: 'c12', text: 'Có đuôi', icon: '〰️', isCorrect: true, type: 'sensory' },
      { id: 'c13', text: 'Có mang', icon: '💨', isCorrect: true, type: 'sensory' },
      { id: 'c14', text: 'Lạnh', icon: '❄️', isCorrect: true, type: 'sensory' },
      // RATIONAL - Lý tính
      { id: 'c5', text: 'Sống dưới nước', icon: '🌊', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Thở bằng mang', icon: '💨', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Bơi được', icon: '🏊', isCorrect: true, type: 'rational' },
      { id: 'c15', text: 'Không thể sống trên cạn', icon: '🚫', isCorrect: true, type: 'rational' },
      { id: 'c16', text: 'Ăn tảo và côn trùng', icon: '🌿', isCorrect: true, type: 'rational' },
      { id: 'c17', text: 'Đẻ trứng', icon: '🥚', isCorrect: true, type: 'rational' },
      { id: 'c18', text: 'Sống trong nước ngọt hoặc mặn', icon: '🌊', isCorrect: true, type: 'rational' },
      // PRACTICAL - Thực tiễn
      { id: 'c8', text: 'Có thể thả vào nước', icon: '🌊', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể nuôi trong bể', icon: '🏠', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể cho ăn thức ăn cá', icon: '🍖', isCorrect: true, type: 'practical' },
      { id: 'c19', text: 'Có thể câu được', icon: '🎣', isCorrect: true, type: 'practical' },
      { id: 'c20', text: 'Có thể quan sát bơi', icon: '👁️', isCorrect: true, type: 'practical' },
      { id: 'c21', text: 'Có thể thay nước', icon: '💧', isCorrect: true, type: 'practical' },
      { id: 'c22', text: 'Có thể cho ăn giun', icon: '🐛', isCorrect: true, type: 'practical' },
      // NHIỄU - Sensory
      { id: 'n1', text: 'Có chân', icon: '🦵', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có lông', icon: '🧶', isCorrect: false, type: 'sensory' },
      { id: 'n8', text: 'Có cánh', icon: '🪽', isCorrect: false, type: 'sensory' },
      { id: 'n9', text: 'Kêu "gâu gâu"', icon: '🔊', isCorrect: false, type: 'sensory' },
      { id: 'n19', text: 'Kêu "meo meo"', icon: '🔊', isCorrect: false, type: 'sensory' },
      { id: 'n20', text: 'Có móng vuốt sắc', icon: '🔪', isCorrect: false, type: 'sensory' },
      { id: 'n23', text: 'Có mỏ nhọn', icon: '🦆', isCorrect: false, type: 'sensory' },
      { id: 'n24', text: 'Có 6 chân', icon: '🐜', isCorrect: false, type: 'sensory' },
      { id: 'n25', text: 'Có 8 chân', icon: '🕷️', isCorrect: false, type: 'sensory' },
      { id: 'n26', text: 'Có vỏ mai', icon: '🐢', isCorrect: false, type: 'sensory' },
      { id: 'n27', text: 'Có râu dài', icon: '😺', isCorrect: false, type: 'sensory' },
      { id: 'n28', text: 'Có túi bụng', icon: '🦘', isCorrect: false, type: 'sensory' },
      { id: 'n29', text: 'Có gai nhọn', icon: '🦔', isCorrect: false, type: 'sensory' },
      { id: 'n30', text: 'Có sừng nhọn', icon: '🦌', isCorrect: false, type: 'sensory' },
      { id: 'n31', text: 'Có vòi dài', icon: '🐘', isCorrect: false, type: 'sensory' },
      { id: 'n32', text: 'Có vỏ cứng', icon: '🐚', isCorrect: false, type: 'sensory' },
      { id: 'n33', text: 'Màu xanh lá', icon: '🟢', isCorrect: false, type: 'sensory' },
      { id: 'n34', text: 'Có lông vũ', icon: '🪶', isCorrect: false, type: 'sensory' },
      // NHIỄU - Rational
      { id: 'n3', text: 'Biết bay', icon: '✈️', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Là thực vật', icon: '🌿', isCorrect: false, type: 'rational' },
      { id: 'n10', text: 'Ăn cỏ', icon: '🌾', isCorrect: false, type: 'rational' },
      { id: 'n11', text: 'Là động vật có vú', icon: '🐾', isCorrect: false, type: 'rational' },
      { id: 'n13', text: 'Thích săn chuột', icon: '🐭', isCorrect: false, type: 'rational' },
      { id: 'n14', text: 'Sống trên cây', icon: '🏞️', isCorrect: false, type: 'rational' },
      { id: 'n15', text: 'Sống thành bầy', icon: '👥', isCorrect: false, type: 'rational' },
      { id: 'n35', text: 'Thích leo trèo', icon: '🐒', isCorrect: false, type: 'rational' },
      { id: 'n36', text: 'Ngủ đông', icon: '🐻', isCorrect: false, type: 'rational' },
      { id: 'n37', text: 'Sống dưới đất', icon: '🐹', isCorrect: false, type: 'rational' },
      { id: 'n38', text: 'Sống ở sa mạc', icon: '🐪', isCorrect: false, type: 'rational' },
      { id: 'n39', text: 'Rất trung thành', icon: '❤️', isCorrect: false, type: 'rational' },
      { id: 'n40', text: 'Thích ẩn náu', icon: '🦎', isCorrect: false, type: 'rational' },
      // NHIỄU - Practical
      { id: 'n5', text: 'Có thể lái', icon: '🏎️', isCorrect: false, type: 'practical' },
      { id: 'n6', text: 'Có thể cắm sạc', icon: '🔌', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể dạy nói', icon: '🗣️', isCorrect: false, type: 'practical' },
      { id: 'n12', text: 'Có thể vuốt ve', icon: '✋', isCorrect: false, type: 'practical' },
      { id: 'n16', text: 'Có thể đọc được', icon: '📖', isCorrect: false, type: 'practical' },
      { id: 'n17', text: 'Có thể uống được', icon: '🥤', isCorrect: false, type: 'practical' },
      { id: 'n18', text: 'Có thể dắt đi dạo', icon: '🦮', isCorrect: false, type: 'practical' },
      { id: 'n41', text: 'Có thể cưỡi được', icon: '🏇', isCorrect: false, type: 'practical' },
      { id: 'n42', text: 'Có thể vắt sữa', icon: '🥛', isCorrect: false, type: 'practical' },
      { id: 'n43', text: 'Có thể hái được', icon: '🌳', isCorrect: false, type: 'practical' },
      { id: 'n44', text: 'Có thể trồng được', icon: '🌱', isCorrect: false, type: 'practical' },
      { id: 'n45', text: 'Có thể bật công tắc', icon: '💡', isCorrect: false, type: 'practical' },
      { id: 'n46', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' }
    ],
    category: 'Động vật',
    correctGuess: 'Con cá',
    wrongGuesses: ['Con rắn', 'Con ếch', 'Con tôm', 'Con mực', 'Con cá heo'],
    verificationAction: {
      correct: 'Thả vào nước và xem có bơi không',
      incorrect: ['Cho ăn thức ăn cá và xem phản ứng', 'Xem vảy và xác định', 'Đo kích thước và nhận biết']
    }
  },

  // THỰC PHẨM
  {
    id: 'apple',
    name: 'Quả táo',
    image: '🍎',
    description: 'Một loại quả tròn...',
    characteristics: [
      // SENSORY - Cảm quan
      { id: 'c1', text: 'Hình tròn', icon: '⭕', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Màu đỏ', icon: '🔴', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Vị ngọt', icon: '🍬', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Có mùi thơm', icon: '👃', isCorrect: true, type: 'sensory' },
      { id: 'c11', text: 'Vỏ mỏng', icon: '📄', isCorrect: true, type: 'sensory' },
      { id: 'c12', text: 'Giòn', icon: '🔊', isCorrect: true, type: 'sensory' },
      { id: 'c13', text: 'Có cuống', icon: '🌿', isCorrect: true, type: 'sensory' },
      { id: 'c14', text: 'Ruột trắng', icon: '⚪', isCorrect: true, type: 'sensory' },
      // RATIONAL - Lý tính
      { id: 'c5', text: 'Là trái cây', icon: '🍇', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Có hạt bên trong', icon: '🌰', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Mọc trên cây', icon: '🏞️', isCorrect: true, type: 'rational' },
      { id: 'c15', text: 'Giàu vitamin C', icon: '💊', isCorrect: true, type: 'rational' },
      { id: 'c16', text: 'Tốt cho sức khỏe', icon: '💚', isCorrect: true, type: 'rational' },
      { id: 'c17', text: 'Có nhiều giống', icon: '🌳', isCorrect: true, type: 'rational' },
      { id: 'c18', text: 'Mùa thu là mùa chín', icon: '🍂', isCorrect: true, type: 'rational' },
      // PRACTICAL - Thực tiễn
      { id: 'c8', text: 'Có thể ăn được', icon: '🍽️', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể cắt ra', icon: '🔪', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể nấu thành nước', icon: '🥤', isCorrect: true, type: 'practical' },
      { id: 'c19', text: 'Có thể rửa sạch', icon: '💧', isCorrect: true, type: 'practical' },
      { id: 'c20', text: 'Có thể làm mứt', icon: '🍯', isCorrect: true, type: 'practical' },
      { id: 'c21', text: 'Có thể nướng', icon: '🔥', isCorrect: true, type: 'practical' },
      { id: 'c22', text: 'Có thể gọt vỏ', icon: '🔪', isCorrect: true, type: 'practical' },
      // NHIỄU - Sensory
      { id: 'n1', text: 'Có vỏ cứng như dừa', icon: '🥥', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Vị chua', icon: '🍋', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Màu vàng', icon: '🟡', isCorrect: false, type: 'sensory' },
      { id: 'n8', text: 'Hình dài cong', icon: '🌙', isCorrect: false, type: 'sensory' },
      { id: 'n9', text: 'Có múi', icon: '🍊', isCorrect: false, type: 'sensory' },
      { id: 'n19', text: 'Có chân', icon: '🦵', isCorrect: false, type: 'sensory' },
      { id: 'n20', text: 'Có lông', icon: '🧶', isCorrect: false, type: 'sensory' },
      { id: 'n21', text: 'Có cánh', icon: '🪽', isCorrect: false, type: 'sensory' },
      { id: 'n22', text: 'Có vảy', icon: '🐠', isCorrect: false, type: 'sensory' },
      { id: 'n23', text: 'Hình trái tim', icon: '❤️', isCorrect: false, type: 'sensory' },
      { id: 'n24', text: 'Có hạt ngoài vỏ', icon: '🌰', isCorrect: false, type: 'sensory' },
      { id: 'n25', text: 'Màu cam', icon: '🟠', isCorrect: false, type: 'sensory' },
      { id: 'n26', text: 'Hình tròn nhỏ', icon: '⚫', isCorrect: false, type: 'sensory' },
      { id: 'n27', text: 'Màu tím', icon: '🟣', isCorrect: false, type: 'sensory' },
      { id: 'n28', text: 'Vỏ xanh sọc', icon: '🟢', isCorrect: false, type: 'sensory' },
      { id: 'n29', text: 'Ruột đỏ', icon: '🔴', isCorrect: false, type: 'sensory' },
      { id: 'n30', text: 'Mềm xốp', icon: '☁️', isCorrect: false, type: 'sensory' },
      { id: 'n31', text: 'Màu vàng nâu', icon: '🟤', isCorrect: false, type: 'sensory' },
      // NHIỄU - Rational
      { id: 'n4', text: 'Là động vật', icon: '🐾', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Mọc dưới đất', icon: '🥔', isCorrect: false, type: 'rational' },
      { id: 'n10', text: 'Có vỏ bóc được', icon: '📦', isCorrect: false, type: 'rational' },
      { id: 'n11', text: 'Giàu kali', icon: '💪', isCorrect: false, type: 'rational' },
      { id: 'n13', text: 'Là trái cây có múi', icon: '🍊', isCorrect: false, type: 'rational' },
      { id: 'n14', text: 'Có vỏ dày', icon: '🥥', isCorrect: false, type: 'rational' },
      { id: 'n15', text: 'Mọc thành chùm', icon: '🍇', isCorrect: false, type: 'rational' },
      { id: 'n32', text: 'Mọc trên dây leo', icon: '🌿', isCorrect: false, type: 'rational' },
      { id: 'n33', text: 'Có hạt nhỏ', icon: '🌰', isCorrect: false, type: 'rational' },
      { id: 'n34', text: 'Nhiều nước', icon: '💧', isCorrect: false, type: 'rational' },
      { id: 'n35', text: 'Có hạt đen', icon: '⚫', isCorrect: false, type: 'rational' },
      { id: 'n36', text: 'Làm từ bột', icon: '🌾', isCorrect: false, type: 'rational' },
      { id: 'n37', text: 'Cần nướng', icon: '🔥', isCorrect: false, type: 'rational' },
      { id: 'n38', text: 'Sống dưới nước', icon: '🌊', isCorrect: false, type: 'rational' },
      // NHIỄU - Practical
      { id: 'n6', text: 'Có thể cắm sạc', icon: '🔌', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể lái được', icon: '🏎️', isCorrect: false, type: 'practical' },
      { id: 'n12', text: 'Có thể bóc vỏ', icon: '✋', isCorrect: false, type: 'practical' },
      { id: 'n16', text: 'Có thể vắt nước', icon: '🥤', isCorrect: false, type: 'practical' },
      { id: 'n17', text: 'Có thể ăn từng múi', icon: '🍽️', isCorrect: false, type: 'practical' },
      { id: 'n18', text: 'Có thể làm rượu', icon: '🍷', isCorrect: false, type: 'practical' },
      { id: 'n39', text: 'Có thể gõ nghe âm', icon: '👂', isCorrect: false, type: 'practical' },
      { id: 'n40', text: 'Có thể cắt lát', icon: '🔪', isCorrect: false, type: 'practical' },
      { id: 'n41', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' },
      { id: 'n42', text: 'Có thể vuốt ve', icon: '✋', isCorrect: false, type: 'practical' },
      { id: 'n43', text: 'Có thể dắt đi dạo', icon: '🦮', isCorrect: false, type: 'practical' },
      { id: 'n44', text: 'Có thể tưới nước', icon: '💧', isCorrect: false, type: 'practical' }
    ],
    category: 'Thực phẩm',
    correctGuess: 'Quả táo',
    wrongGuesses: ['Quả cam', 'Quả lê', 'Quả đào', 'Quả mận', 'Quả hồng'],
    verificationAction: {
      correct: 'Cắt ra và nếm thử',
      incorrect: ['Ngửi mùi và xác định', 'Cân nặng và đo kích thước', 'Xem màu sắc và hình dạng']
    }
  },
  {
    id: 'banana',
    name: 'Quả chuối',
    image: '🍌',
    description: 'Một loại quả dài...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Hình dài cong', icon: '🌙', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Màu vàng', icon: '🟡', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Vị ngọt', icon: '🍬', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Mềm', icon: '🧈', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là trái cây', icon: '🍇', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Có vỏ bóc được', icon: '📦', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Giàu kali', icon: '💪', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể bóc vỏ', icon: '✋', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể ăn sống', icon: '🍽️', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể làm sinh tố', icon: '🥤', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Hình tròn', icon: '⭕', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Màu đỏ', icon: '🔴', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Có vỏ cứng', icon: '🥥', isCorrect: false, type: 'sensory' },
      { id: 'n8', text: 'Có mùi thơm', icon: '👃', isCorrect: false, type: 'sensory' },
      { id: 'n9', text: 'Có múi', icon: '🍊', isCorrect: false, type: 'sensory' },
      { id: 'n4', text: 'Là động vật', icon: '🐾', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Có múi', icon: '🍊', isCorrect: false, type: 'rational' },
      { id: 'n10', text: 'Có hạt bên trong', icon: '🌰', isCorrect: false, type: 'rational' },
      { id: 'n11', text: 'Mọc trên cây', icon: '🌳', isCorrect: false, type: 'rational' },
      { id: 'n6', text: 'Có thể cắm sạc', icon: '🔌', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' },
      { id: 'n12', text: 'Có thể cắt ra', icon: '🔪', isCorrect: false, type: 'practical' }
    ],
    category: 'Thực phẩm',
    correctGuess: 'Quả chuối',
    wrongGuesses: ['Quả táo', 'Quả xoài', 'Quả đu đủ', 'Quả dưa gang', 'Quả bí'],
    verificationAction: {
      correct: 'Bóc vỏ và ăn thử',
      incorrect: ['Ngửi mùi và xác định', 'Bóp mềm và cảm nhận', 'Xem màu vàng và nhận biết']
    }
  },
  {
    id: 'orange',
    name: 'Quả cam',
    image: '🍊',
    description: 'Một loại quả có múi...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Hình tròn', icon: '⭕', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Màu cam', icon: '🟠', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Vị chua ngọt', icon: '🍋', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Có mùi thơm', icon: '👃', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là trái cây có múi', icon: '🍊', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Giàu vitamin C', icon: '💊', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Có vỏ dày', icon: '🥥', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể bóc vỏ', icon: '✋', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể vắt nước', icon: '🥤', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể ăn từng múi', icon: '🍽️', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Dài như chuối', icon: '🍌', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Màu đỏ', icon: '🔴', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Có chân', icon: '🦵', isCorrect: false, type: 'sensory' },
      { id: 'n4', text: 'Là động vật', icon: '🐾', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Mọc dưới đất', icon: '🥔', isCorrect: false, type: 'rational' },
      { id: 'n6', text: 'Có thể cắm sạc', icon: '🔌', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' }
    ],
    category: 'Thực phẩm',
    correctGuess: 'Quả cam',
    wrongGuesses: ['Quả bưởi', 'Quả chanh', 'Quả quýt', 'Quả táo', 'Quả cam vàng'],
    verificationAction: {
      correct: 'Bóc vỏ và nếm thử',
      incorrect: ['Ngửi mùi thơm và xác định', 'Vắt nước và uống thử', 'Xem màu cam và nhận biết']
    }
  },
  {
    id: 'grape',
    name: 'Quả nho',
    image: '🍇',
    description: 'Những quả nhỏ chùm...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Hình tròn nhỏ', icon: '⚫', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Màu tím hoặc xanh', icon: '🟣', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Vị ngọt', icon: '🍬', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Mọc thành chùm', icon: '🍇', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là trái cây', icon: '🍎', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Có hạt nhỏ', icon: '🌰', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Mọc trên dây leo', icon: '🌿', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể ăn từng quả', icon: '🍽️', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể làm rượu', icon: '🍷', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể rửa và ăn', icon: '💧', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Hình dài', icon: '🍌', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Màu đỏ', icon: '🔴', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Có lông', icon: '🧶', isCorrect: false, type: 'sensory' },
      { id: 'n4', text: 'Là động vật', icon: '🐾', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Mọc dưới đất', icon: '🥔', isCorrect: false, type: 'rational' },
      { id: 'n6', text: 'Có thể cắm sạc', icon: '🔌', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' }
    ],
    category: 'Thực phẩm',
    correctGuess: 'Quả nho',
    wrongGuesses: ['Quả mọng', 'Quả cherry', 'Quả việt quất', 'Quả nho đen', 'Quả mâm xôi'],
    verificationAction: {
      correct: 'Rửa sạch và ăn thử',
      incorrect: ['Đếm số quả trong chùm', 'Xem màu tím và xác định', 'Bóp nhẹ và cảm nhận']
    }
  },
  {
    id: 'watermelon',
    name: 'Quả dưa hấu',
    image: '🍉',
    description: 'Một quả to tròn...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Hình tròn to', icon: '⚫', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Vỏ xanh sọc', icon: '🟢', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Ruột đỏ', icon: '🔴', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Vị ngọt mát', icon: '🍬', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là trái cây', icon: '🍎', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Nhiều nước', icon: '💧', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Có hạt đen', icon: '⚫', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể cắt ra ăn', icon: '🔪', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể làm nước ép', icon: '🥤', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể gõ nghe âm', icon: '👂', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Nhỏ như nho', icon: '🍇', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Màu vàng', icon: '🟡', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Có chân', icon: '🦵', isCorrect: false, type: 'sensory' },
      { id: 'n4', text: 'Là động vật', icon: '🐾', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Có múi', icon: '🍊', isCorrect: false, type: 'rational' },
      { id: 'n6', text: 'Có thể cắm sạc', icon: '🔌', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' }
    ],
    category: 'Thực phẩm',
    correctGuess: 'Quả dưa hấu',
    wrongGuesses: ['Quả bí', 'Quả dưa gang', 'Quả dưa lưới', 'Quả bóng', 'Quả dưa chuột'],
    verificationAction: {
      correct: 'Cắt ra và nếm thử',
      incorrect: ['Gõ nghe âm thanh và xác định', 'Cân nặng và đo kích thước', 'Xem vỏ xanh sọc và nhận biết']
    }
  },
  {
    id: 'strawberry',
    name: 'Quả dâu tây',
    image: '🍓',
    description: 'Một quả nhỏ màu đỏ...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Hình trái tim', icon: '❤️', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Màu đỏ', icon: '🔴', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Vị ngọt chua', icon: '🍬', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Có hạt ngoài vỏ', icon: '🌰', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là trái cây', icon: '🍎', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Giàu vitamin', icon: '💊', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Mọc sát đất', icon: '🌱', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể ăn sống', icon: '🍽️', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể làm mứt', icon: '🍯', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể rửa và ăn', icon: '💧', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Hình tròn', icon: '⭕', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Màu xanh', icon: '🟢', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Có lông', icon: '🧶', isCorrect: false, type: 'sensory' },
      { id: 'n4', text: 'Là động vật', icon: '🐾', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Mọc trên cây cao', icon: '🌳', isCorrect: false, type: 'rational' },
      { id: 'n6', text: 'Có thể cắm sạc', icon: '🔌', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' }
    ],
    category: 'Thực phẩm',
    correctGuess: 'Quả dâu tây',
    wrongGuesses: ['Quả cherry', 'Quả cà chua', 'Quả mọng', 'Quả dâu rừng', 'Quả phúc bồn tử'],
    verificationAction: {
      correct: 'Rửa sạch và ăn thử',
      incorrect: ['Ngửi mùi thơm và xác định', 'Xem hình trái tim và nhận biết', 'Đếm hạt ngoài vỏ']
    }
  },
  {
    id: 'bread',
    name: 'Bánh mì',
    image: '🍞',
    description: 'Một loại thực phẩm...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Màu vàng nâu', icon: '🟤', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Mềm xốp', icon: '☁️', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Có mùi thơm', icon: '👃', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Hình chữ nhật', icon: '▭', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Làm từ bột', icon: '🌾', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Là thực phẩm', icon: '🍽️', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Cần nướng', icon: '🔥', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể ăn được', icon: '🍽️', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể cắt lát', icon: '🔪', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể nướng', icon: '🔥', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Sống được', icon: '💚', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có chân', icon: '🦵', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Biết bay', icon: '🦅', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Là động vật', icon: '🐾', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Chạy bằng xăng', icon: '⛽', isCorrect: false, type: 'rational' },
      { id: 'n6', text: 'Có thể cắm sạc', icon: '🔋', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' }
    ],
    category: 'Thực phẩm',
    correctGuess: 'Bánh mì',
    wrongGuesses: ['Bánh ngọt', 'Bánh bao', 'Bánh pizza', 'Bánh sandwich', 'Bánh mỳ Pháp'],
    verificationAction: {
      correct: 'Cắn thử và nếm',
      incorrect: ['Ngửi mùi thơm và xác định', 'Bóp mềm xốp và cảm nhận', 'Xem màu vàng nâu và nhận biết']
    }
  },

  // ĐỒ VẬT ĐIỆN TỬ
  {
    id: 'phone',
    name: 'Điện thoại',
    image: '📱',
    description: 'Một thiết bị điện tử...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Có màn hình', icon: '📺', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Hình chữ nhật', icon: '▭', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Nhỏ gọn', icon: '📏', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Có nút bấm', icon: '🔘', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là thiết bị điện tử', icon: '⚡', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Cần sạc pin', icon: '🔋', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Kết nối internet', icon: '🌐', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể gọi điện', icon: '📞', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể chụp ảnh', icon: '📷', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể cầm trên tay', icon: '✋', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Có bánh xe', icon: '🚗', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có lông', icon: '🧶', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Có cánh quạt', icon: '🌀', isCorrect: false, type: 'sensory' },
      { id: 'n8', text: 'Có bàn phím', icon: '⌨️', isCorrect: false, type: 'sensory' },
      { id: 'n9', text: 'Có touchpad', icon: '👆', isCorrect: false, type: 'sensory' },
      { id: 'n4', text: 'Là sinh vật', icon: '🐾', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Là thực vật', icon: '🌿', isCorrect: false, type: 'rational' },
      { id: 'n10', text: 'Cần điện', icon: '🔌', isCorrect: false, type: 'rational' },
      { id: 'n11', text: 'Xử lý dữ liệu', icon: '💾', isCorrect: false, type: 'rational' },
      { id: 'n6', text: 'Có thể ăn được', icon: '🍽️', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể tưới nước', icon: '💧', isCorrect: false, type: 'practical' },
      { id: 'n12', text: 'Có thể gõ văn bản', icon: '📝', isCorrect: false, type: 'practical' }
    ],
    category: 'Đồ vật',
    correctGuess: 'Điện thoại',
    wrongGuesses: ['Máy tính', 'Máy tính bảng', 'Tivi', 'Máy ảnh', 'Điện thoại bàn'],
    verificationAction: {
      correct: 'Bấm nút nguồn và xem có sáng màn hình không',
      incorrect: ['Gọi thử một cuộc gọi', 'Xem màn hình và nhận biết', 'Cầm trên tay và cảm nhận']
    }
  },
  {
    id: 'laptop',
    name: 'Máy tính',
    image: '💻',
    description: 'Một thiết bị làm việc...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Có bàn phím', icon: '⌨️', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Có màn hình', icon: '📺', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Hình chữ nhật', icon: '▭', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Có touchpad', icon: '👆', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là thiết bị điện tử', icon: '⚡', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Cần điện', icon: '🔌', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Xử lý dữ liệu', icon: '💾', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể gõ văn bản', icon: '📝', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể lướt web', icon: '🌐', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể bật nguồn', icon: '🔘', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Có bánh xe', icon: '🚗', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có lông', icon: '🧶', isCorrect: false, type: 'sensory' },
      { id: 'n8', text: 'Nhỏ gọn', icon: '📏', isCorrect: false, type: 'sensory' },
      { id: 'n9', text: 'Có nút bấm', icon: '🔘', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Biết bay', icon: '✈️', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Là sinh vật', icon: '💚', isCorrect: false, type: 'rational' },
      { id: 'n10', text: 'Cần sạc pin', icon: '🔋', isCorrect: false, type: 'rational' },
      { id: 'n11', text: 'Kết nối internet', icon: '🌐', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Ăn được', icon: '🍽️', isCorrect: false, type: 'practical' },
      { id: 'n6', text: 'Có thể tưới nước', icon: '💧', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể nấu ăn', icon: '🍳', isCorrect: false, type: 'practical' },
      { id: 'n12', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' }
    ],
    category: 'Đồ vật',
    correctGuess: 'Máy tính',
    wrongGuesses: ['Điện thoại', 'Máy tính bảng', 'Tivi', 'Máy in', 'Laptop'],
    verificationAction: {
      correct: 'Bật nguồn và gõ bàn phím',
      incorrect: ['Mở màn hình và xem', 'Kết nối wifi và kiểm tra', 'Xem bàn phím và nhận biết']
    }
  },

  // THỰC VẬT
  {
    id: 'tree',
    name: 'Cây xanh',
    image: '🌳',
    description: 'Một sinh vật sống...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Có lá xanh', icon: '🍃', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Có thân gỗ', icon: '🪵', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Cao lớn', icon: '📏', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Có rễ', icon: '🌱', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là thực vật', icon: '🌿', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Cần ánh sáng', icon: '☀️', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Quang hợp', icon: '🍀', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể tưới nước', icon: '💧', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể trồng', icon: '🌱', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể leo lên', icon: '🧗', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Có chân', icon: '🦵', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có mắt', icon: '👁️', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Biết chạy', icon: '🏃', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Kêu được', icon: '🔊', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Có thể cắm sạc', icon: '🔌', isCorrect: false, type: 'practical' },
      { id: 'n6', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' }
    ],
    category: 'Thực vật',
    correctGuess: 'Cây xanh',
    wrongGuesses: ['Cây khô', 'Bụi cây', 'Cây nhựa', 'Cột điện', 'Cây tre'],
    verificationAction: {
      correct: 'Tưới nước và quan sát sau vài ngày',
      incorrect: ['Xem lá xanh và xác định', 'Sờ thân gỗ và cảm nhận', 'Ngửi mùi và nhận biết']
    }
  },
  {
    id: 'flower',
    name: 'Bông hoa',
    image: '🌸',
    description: 'Một phần của cây...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Có màu sắc', icon: '🎨', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Có mùi thơm', icon: '👃', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Có cánh hoa', icon: '🌺', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Mềm mại', icon: '☁️', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là bộ phận thực vật', icon: '🌿', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Mọc trên cây', icon: '🌳', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Có nhụy hoa', icon: '🌼', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể ngửi', icon: '👃', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể hái', icon: '✋', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể cắm bình', icon: '🏺', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Có chân', icon: '🦵', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có màn hình', icon: '📺', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Biết bay', icon: '🦅', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Cần sạc pin', icon: '🔋', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' },
      { id: 'n6', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể ăn', icon: '🍽️', isCorrect: false, type: 'practical' }
    ],
    category: 'Thực vật',
    correctGuess: 'Bông hoa',
    wrongGuesses: ['Lá cây', 'Quả', 'Rễ cây', 'Cành cây', 'Bông hoa giả'],
    verificationAction: {
      correct: 'Ngửi và cảm nhận mùi hương',
      incorrect: ['Xem màu sắc và xác định', 'Sờ cánh hoa và cảm nhận', 'Đếm số cánh hoa']
    }
  },

  // PHƯƠNG TIỆN
  {
    id: 'car',
    name: 'Ô tô',
    image: '🚗',
    description: 'Một phương tiện di chuyển...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Có 4 bánh xe', icon: '⚙️', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Có vô lăng', icon: '🎮', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Có cửa', icon: '🚪', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Lớn', icon: '📏', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là phương tiện', icon: '🚗', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Chạy bằng xăng', icon: '⛽', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Chạy trên đường', icon: '🛣️', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể lái', icon: '🎮', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể chở người', icon: '👥', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể đổ xăng', icon: '⛽', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Bay trên trời', icon: '✈️', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có lông', icon: '🧶', isCorrect: false, type: 'sensory' },
      { id: 'n8', text: 'Có 2 bánh xe', icon: '⚙️', isCorrect: false, type: 'sensory' },
      { id: 'n9', text: 'Có bàn đạp', icon: '🦶', isCorrect: false, type: 'sensory' },
      { id: 'n10', text: 'Nhẹ nhàng', icon: '🪶', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Bơi dưới nước', icon: '🌊', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Ăn cỏ', icon: '🌿', isCorrect: false, type: 'rational' },
      { id: 'n11', text: 'Chạy bằng sức người', icon: '💪', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Có thể ăn', icon: '🍽️', isCorrect: false, type: 'practical' },
      { id: 'n6', text: 'Có thể tưới nước', icon: '💧', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' },
      { id: 'n12', text: 'Có thể đạp', icon: '🦶', isCorrect: false, type: 'practical' }
    ],
    category: 'Phương tiện',
    correctGuess: 'Ô tô',
    wrongGuesses: ['Xe máy', 'Xe tải', 'Xe bus', 'Xe jeep', 'Xe hơi'],
    verificationAction: {
      correct: 'Mở cửa và ngồi vào lái thử',
      incorrect: ['Xem 4 bánh xe và xác định', 'Nghe tiếng động cơ', 'Đổ xăng và kiểm tra']
    }
  },
  {
    id: 'bicycle',
    name: 'Xe đạp',
    image: '🚲',
    description: 'Một phương tiện hai bánh...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Có 2 bánh xe', icon: '⚙️', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Có bàn đạp', icon: '🦶', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Có tay lái', icon: '🎮', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Nhẹ nhàng', icon: '🪶', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là phương tiện', icon: '🚲', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Chạy bằng sức người', icon: '💪', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Không cần xăng', icon: '🚫', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể đạp', icon: '🦶', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể lái', icon: '🎮', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể đi trên đường', icon: '🛣️', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Chạy bằng xăng', icon: '⛽', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có 4 bánh', icon: '🚗', isCorrect: false, type: 'sensory' },
      { id: 'n8', text: 'Có vô lăng', icon: '🎮', isCorrect: false, type: 'sensory' },
      { id: 'n9', text: 'Có cửa', icon: '🚪', isCorrect: false, type: 'sensory' },
      { id: 'n10', text: 'Lớn', icon: '📏', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Bay được', icon: '✈️', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Có màn hình', icon: '📺', isCorrect: false, type: 'rational' },
      { id: 'n11', text: 'Chạy trên đường', icon: '🛣️', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Có thể ăn', icon: '🍽️', isCorrect: false, type: 'practical' },
      { id: 'n6', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể tưới nước', icon: '💧', isCorrect: false, type: 'practical' },
      { id: 'n12', text: 'Có thể đổ xăng', icon: '⛽', isCorrect: false, type: 'practical' }
    ],
    category: 'Phương tiện',
    correctGuess: 'Xe đạp',
    wrongGuesses: ['Xe máy', 'Xe đạp điện', 'Ô tô', 'Xe scooter', 'Xe ba bánh'],
    verificationAction: {
      correct: 'Đạp bàn đạp và xem có chạy không',
      incorrect: ['Xem 2 bánh xe và xác định', 'Cầm tay lái và cảm nhận', 'Ngồi lên yên và thử']
    }
  },

  // ĐỒ DÙNG
  {
    id: 'book',
    name: 'Quyển sách',
    image: '📚',
    description: 'Một vật dụng học tập...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Có nhiều trang', icon: '📄', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Có chữ viết', icon: '✍️', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Có bìa cứng', icon: '📕', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Hình chữ nhật', icon: '▭', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Làm từ giấy', icon: '📃', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Chứa kiến thức', icon: '🧠', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Là đồ dùng học tập', icon: '🎓', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể đọc', icon: '👓', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể lật trang', icon: '👆', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể cầm trên tay', icon: '✋', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Có màn hình', icon: '📺', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có bánh xe', icon: '⚙️', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Cần sạc pin', icon: '🔋', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Biết bay', icon: '🦅', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Có thể ăn', icon: '🍽️', isCorrect: false, type: 'practical' },
      { id: 'n6', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' }
    ],
    category: 'Đồ dùng',
    correctGuess: 'Quyển sách',
    wrongGuesses: ['Máy tính bảng', 'Tờ báo', 'Vở', 'Tạp chí', 'Quyển truyện'],
    verificationAction: {
      correct: 'Mở ra và đọc nội dung',
      incorrect: ['Xem bìa cứng và xác định', 'Lật trang và cảm nhận', 'Đếm số trang']
    }
  },
  {
    id: 'ball',
    name: 'Quả bóng',
    image: '⚽',
    description: 'Một đồ chơi tròn...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Hình tròn', icon: '⭕', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Nhẹ', icon: '🪶', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Có vân', icon: '⚽', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Đàn hồi', icon: '🏀', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là đồ chơi', icon: '🎮', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Dùng trong thể thao', icon: '⚽', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Làm từ cao su', icon: '🎈', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể đá', icon: '🦶', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể ném', icon: '🤾', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể bơm hơi', icon: '💨', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Có màn hình', icon: '📺', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có chân', icon: '🦵', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Cần sạc pin', icon: '🔋', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Biết bay cao', icon: '✈️', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Có thể ăn', icon: '🍽️', isCorrect: false, type: 'practical' },
      { id: 'n6', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể tưới nước', icon: '💧', isCorrect: false, type: 'practical' }
    ],
    category: 'Đồ chơi',
    correctGuess: 'Quả bóng',
    wrongGuesses: ['Quả táo', 'Quả cam', 'Quả bóng chày', 'Trái đất', 'Quả bóng rổ'],
    verificationAction: {
      correct: 'Đá hoặc ném và xem có nảy không',
      incorrect: ['Xem hình tròn và xác định', 'Bóp và cảm nhận độ đàn hồi', 'Bơm hơi và kiểm tra']
    }
  },

  // HIỆN TƯỢNG TỰ NHIÊN
  {
    id: 'sun',
    name: 'Mặt trời',
    image: '☀️',
    description: 'Một thiên thể sáng...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Rất sáng', icon: '💡', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Rất nóng', icon: '🔥', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Hình tròn', icon: '⭕', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Màu vàng', icon: '🟡', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là thiên thể', icon: '🌌', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Ở trên trời', icon: '☁️', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Cho ánh sáng', icon: '💡', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể nhìn thấy ban ngày', icon: '👁️', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể cảm nhận nhiệt', icon: '🌡️', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể chụp ảnh', icon: '📷', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Có chân', icon: '🦵', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Lạnh', icon: '❄️', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Ăn được', icon: '🍽️', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Cần sạc pin', icon: '🔋', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Có thể cầm tay', icon: '✋', isCorrect: false, type: 'practical' },
      { id: 'n6', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' }
    ],
    category: 'Thiên nhiên',
    correctGuess: 'Mặt trời',
    wrongGuesses: ['Mặt trăng', 'Ngôi sao', 'Đèn', 'Mặt trời giả', 'Ánh sáng'],
    verificationAction: {
      correct: 'Nhìn lên trời vào ban ngày',
      incorrect: ['Cảm nhận nhiệt độ nóng', 'Xem ánh sáng chói và xác định', 'Đo nhiệt độ']
    }
  },
  {
    id: 'water',
    name: 'Nước',
    image: '💧',
    description: 'Một chất lỏng...',
    characteristics: [
      // SENSORY
      { id: 'c1', text: 'Lỏng', icon: '🌊', isCorrect: true, type: 'sensory' },
      { id: 'c2', text: 'Trong suốt', icon: '💎', isCorrect: true, type: 'sensory' },
      { id: 'c3', text: 'Không màu', icon: '⚪', isCorrect: true, type: 'sensory' },
      { id: 'c4', text: 'Mát lạnh', icon: '❄️', isCorrect: true, type: 'sensory' },
      // RATIONAL
      { id: 'c5', text: 'Là chất lỏng', icon: '💧', isCorrect: true, type: 'rational' },
      { id: 'c6', text: 'Cần thiết cho sự sống', icon: '💚', isCorrect: true, type: 'rational' },
      { id: 'c7', text: 'Chảy từ cao xuống thấp', icon: '🏞️', isCorrect: true, type: 'rational' },
      // PRACTICAL
      { id: 'c8', text: 'Có thể uống', icon: '🥤', isCorrect: true, type: 'practical' },
      { id: 'c9', text: 'Có thể rửa tay', icon: '🧼', isCorrect: true, type: 'practical' },
      { id: 'c10', text: 'Có thể đổ vào cốc', icon: '🥛', isCorrect: true, type: 'practical' },
      // NHIỄU
      { id: 'n1', text: 'Cứng', icon: '🪨', isCorrect: false, type: 'sensory' },
      { id: 'n2', text: 'Có chân', icon: '🦵', isCorrect: false, type: 'sensory' },
      { id: 'n3', text: 'Có màn hình', icon: '📺', isCorrect: false, type: 'rational' },
      { id: 'n4', text: 'Cần sạc pin', icon: '🔋', isCorrect: false, type: 'rational' },
      { id: 'n5', text: 'Có thể lái', icon: '🚗', isCorrect: false, type: 'practical' },
      { id: 'n6', text: 'Có thể gọi điện', icon: '📞', isCorrect: false, type: 'practical' },
      { id: 'n7', text: 'Có thể đá bóng', icon: '⚽', isCorrect: false, type: 'practical' }
    ],
    category: 'Thiên nhiên',
    correctGuess: 'Nước',
    wrongGuesses: ['Sữa', 'Dầu', 'Nước ngọt', 'Nước suối', 'Nước chanh'],
    verificationAction: {
      correct: 'Uống thử một ngụm',
      incorrect: ['Xem trong suốt và xác định', 'Sờ vào và cảm nhận lạnh', 'Đổ vào cốc và quan sát']
    }
  }
]

// Hàm random 5 objects và thêm đặc điểm nhiễu ngẫu nhiên
export const getRandomObjects = (count: number = 5): GameObject[] => {
  const shuffled = [...gameObjects].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)
  
  // Thêm đặc điểm nhiễu ngẫu nhiên cho mỗi object
  return selected.map(obj => ({
    ...obj,
    characteristics: addRandomDistractors(obj.characteristics, 10)
  }))
}
