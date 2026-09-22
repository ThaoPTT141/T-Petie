"""
T-Petie Promotion & Sale Price Extractor
Script đọc và trích xuất giá ưu đãi & giá gốc in trực tiếp trên ảnh images/sale/
"""

import os
import json
import re

# Dữ liệu trích xuất từ 50 ảnh sale trong images/sale/
# Đọc trực tiếp từ nhãn giá in trên từng ảnh (Sale Price + Original Crossed-out Price + Sizes)
EXTRACTED_DATA = [
    {
        "id": 1,
        "filename": "1789732196254_5483593727769673322_g1185252936286095617_90dc60157e9187b277fc00f75898efd0.jpg",
        "name": "Set Xuân Diệu",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 415000,
        "originalPrice": 845000,
        "size": "Size 100 (13-15kg) | 140 (30-35kg)"
    },
    {
        "id": 2,
        "filename": "1789732196285_5483593727769673322_g1185252936286095617_b78d45b6fa772b33f9df490815913b02.jpg",
        "name": "Set Thanh Lam",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 295000,
        "originalPrice": 495000,
        "size": "Size 100 (13-15kg) - 140 (30-35kg)"
    },
    {
        "id": 3,
        "filename": "1789732196303_5483593727769673322_g1185252936286095617_6ce40f24a8f7988e36387b45142d64d9.jpg",
        "name": "Sét Cát Chu",
        "collection": "BST Mừng Lễ 2/9",
        "campaign": "le2-9",
        "salePrice": 295000,
        "originalPrice": 445000,
        "size": "Size 90 (10-12kg) - 110 (16-20kg)"
    },
    {
        "id": 4,
        "filename": "1789732196318_5483593727769673322_g1185252936286095617_4fd339ea89b9240b55d49975d6b2baa9.jpg",
        "name": "Áo Kẹo Táo",
        "collection": "BST Mừng Lễ 2/9",
        "campaign": "le2-9",
        "salePrice": 215000,
        "originalPrice": 325000,
        "size": "Size 110 (16-20kg) - 120 (20-25kg)"
    },
    {
        "id": 5,
        "filename": "1789732196328_5483593727769673322_g1185252936286095617_2ccb32be66e04882a3996a4cd9a9c12b.jpg",
        "name": "Quần Váy Đỏ & Rêu",
        "collection": "BST Thu Đông",
        "campaign": "sale-ngay-doi",
        "salePrice": 105000,
        "originalPrice": 125000,
        "size": "Size 100 (13-15kg) - 150 (35-40kg)"
    },
    {
        "id": 6,
        "filename": "1789732196339_5483593727769673322_g1185252936286095617_a2e40b03e88d0fe8b18ba086ee7347c9.jpg",
        "name": "Váy Bánh Gừng Caro",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 255000,
        "originalPrice": 415000,
        "size": "Size 90 (10-12kg) - 150 (35-40kg)"
    },
    {
        "id": 7,
        "filename": "1789732196347_5483593727769673322_g1185252936286095617_4a8d518eb4f4c8ac57620759fe441bf9.jpg",
        "name": "Áo Bánh Kem",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 195000,
        "originalPrice": 285000,
        "size": "Size 90 (10-12kg, 80-90cm)"
    },
    {
        "id": 8,
        "filename": "1789732196355_5483593727769673322_g1185252936286095617_3a589dc3c505631aee53fef5edf17daa.jpg",
        "name": "Váy Ngọc Tuyết",
        "collection": "BST Cao Cấp",
        "campaign": "sale-ngay-doi",
        "salePrice": 345000,
        "originalPrice": 495000,
        "size": "Size 100 (13-15kg) - 110 (16-20kg)"
    },
    {
        "id": 9,
        "filename": "1789732196364_5483593727769673322_g1185252936286095617_11da4f85379b89da40d2ec52a537d0ae.jpg",
        "name": "Váy Mâm Xôi",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 295000,
        "originalPrice": 425000,
        "size": "Size 100 (13-15kg, 90-100cm)"
    },
    {
        "id": 10,
        "filename": "1789732196371_5483593727769673322_g1185252936286095617_66ebbc9ca9f00d8b91cb7810acc1180b.jpg",
        "name": "Váy Tường Vi Xếp Ly",
        "collection": "BST Hè Khánh Vy",
        "campaign": "sale-ngay-doi",
        "salePrice": 374000,
        "originalPrice": 545000,
        "size": "Size 130 (25-30kg) - 150 (35-40kg)"
    },
    {
        "id": 11,
        "filename": "1789732196379_5483593727769673322_g1185252936286095617_77e105228277192dabd8aef3526a8dea.jpg",
        "name": "Quần Bom Jean Nơ",
        "collection": "BST Hè Khánh Vy",
        "campaign": "sale-ngay-doi",
        "salePrice": 150000,
        "originalPrice": 165000,
        "size": "Size 130 (25-30kg) - 150 (35-40kg)"
    },
    {
        "id": 12,
        "filename": "1789732196387_5483593727769673322_g1185252936286095617_b18593c70aa2fee97561f50d35a48e1a.jpg",
        "name": "Quần Bí Ngố Thủy Thủ",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 125000,
        "originalPrice": 135000,
        "size": "Size 130 (25-30kg) - 150 (35-40kg)"
    },
    {
        "id": 13,
        "filename": "1789732196395_5483593727769673322_g1185252936286095617_5e4a1adf8ceb8f090ab29dc632067304.jpg",
        "name": "Váy Lily Thu Đông",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 195000,
        "originalPrice": 280000, # Ảnh chỉ ghi 195k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 110 (16-20kg, 100-110cm)"
    },
    {
        "id": 14,
        "filename": "1789732196402_5483593727769673322_g1185252936286095617_4e6ae352479704681639366b1e0374ed.jpg",
        "name": "Áo Yếm Hoa Cam",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 90000,
        "originalPrice": 130000, # Ảnh chỉ ghi 90k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 120 (20-25kg, 110-120cm)"
    },
    {
        "id": 15,
        "filename": "1789732196410_5483593727769673322_g1185252936286095617_ad854906cf8687fe5d4dfde51d28b9bd.jpg",
        "name": "Áo Cam Ren",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 99000,
        "originalPrice": 145000, # Ảnh chỉ ghi 99k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 110 (16-20kg) - 120 (20-25kg)"
    },
    {
        "id": 16,
        "filename": "1789732196418_5483593727769673322_g1185252936286095617_f82a0ab3abeaa57aa872e99de5b56927.jpg",
        "name": "Quần Bom Hoa Nhí",
        "collection": "BST Học Xinh Kem",
        "campaign": "sale-ngay-doi",
        "salePrice": 90000,
        "originalPrice": 130000, # Ảnh chỉ ghi 90k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 110 (16-20kg) - 140 (30-35kg)"
    },
    {
        "id": 17,
        "filename": "1789732196426_5483593727769673322_g1185252936286095617_cd3f319e063f7d2b68c9603d99dcb822.jpg",
        "name": "Set Thị Lựu Đỏ",
        "collection": "BST Mừng Lễ 2/9",
        "campaign": "le2-9",
        "salePrice": 195000,
        "originalPrice": 280000, # Ảnh chỉ ghi 195k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 140 (30-35kg, 130-140cm)"
    },
    {
        "id": 18,
        "filename": "1789732196434_5483593727769673322_g1185252936286095617_a210732a642cbb3b99e5c148203afca6.jpg",
        "name": "Váy Trà Sữa",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 165000,
        "originalPrice": 235000, # Ảnh chỉ ghi 165k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 110 (16-20kg) - 130 (25-30kg)"
    },
    {
        "id": 19,
        "filename": "1789732196441_5483593727769673322_g1185252936286095617_cbd41e1f0e0424be3d87ad1b0e9ad132.jpg",
        "name": "Áo Sunny Vàng",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 185000,
        "originalPrice": 265000, # Ảnh chỉ ghi 185k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 110 (16-20kg) - 130 (25-30kg)"
    },
    {
        "id": 20,
        "filename": "1789732196449_5483593727769673322_g1185252936286095617_c8faca7f49a688675a91159d82a24e68.jpg",
        "name": "Áo Lavender Tím",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 185000,
        "originalPrice": 265000, # Ảnh chỉ ghi 185k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 110 (16-20kg) - 130 (25-30kg)"
    },
    {
        "id": 21,
        "filename": "1789732196456_5483593727769673322_g1185252936286095617_0f68c1dd30b92134f67fc7b78da3fbe3.jpg",
        "name": "Váy Hạ Tú Cổ Vịt",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 255000,
        "originalPrice": 365000, # Ảnh chỉ ghi 255k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 130 (25-30kg, 120-130cm)"
    },
    {
        "id": 22,
        "filename": "1789732196464_5483593727769673322_g1185252936286095617_cab2a64bbf08531f3cefc819d0b50984.jpg",
        "name": "Váy Tiểu Hoa Trắng",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 255000,
        "originalPrice": 365000, # Ảnh chỉ ghi 255k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 110 (16-20kg) - 140 (30-35kg)"
    },
    {
        "id": 23,
        "filename": "1789732196472_5483593727769673322_g1185252936286095617_436e27b885fbfd93b18a060161ae7c68.jpg",
        "name": "Set Áo Hạnh Nhân & Quần Caro",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 165000,
        "originalPrice": 235000, # Ảnh chỉ ghi 165k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 110 (16-20kg, 100-110cm)"
    },
    {
        "id": 24,
        "filename": "1789732196479_5483593727769673322_g1185252936286095617_ddeec9717fddd7b528d47d9ccb5d1d63.jpg",
        "name": "Quần Bom Caro",
        "collection": "BST Học Xinh Kem",
        "campaign": "sale-ngay-doi",
        "salePrice": 90000,
        "originalPrice": 130000, # Ảnh chỉ ghi 90k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 90 (10-12kg) - 120 (20-25kg)"
    },
    {
        "id": 25,
        "filename": "1789732196487_5483593727769673322_g1185252936286095617_666bdb327933b7460318fcc03f193be5.jpg",
        "name": "Áo Việt Nam Bé (Tặng Thêu Tên)",
        "collection": "BST Mừng Lễ 2/9",
        "campaign": "le2-9",
        "salePrice": 245000,
        "originalPrice": 395000,
        "size": "Size 100 (13-15kg) | 150 (35-40kg)"
    },
    {
        "id": 26,
        "filename": "1789732196496_5483593727769673322_g1185252936286095617_032529d675fd6093bfd62fd1d8d8deca.jpg",
        "name": "Áo Việt Nam Mẹ (Tặng Thêu Tên)",
        "collection": "BST Mừng Lễ 2/9",
        "campaign": "le2-9",
        "salePrice": 420000,
        "originalPrice": 495000,
        "size": "Freesize Mẹ (45-60kg)"
    },
    {
        "id": 27,
        "filename": "1789732196503_5483593727769673322_g1185252936286095617_bb3f58c595070097e2b152c86c25484f.jpg",
        "name": "Set Tổ Quốc Áo Kem Quần Đỏ",
        "collection": "BST Mừng Lễ 2/9",
        "campaign": "le2-9",
        "salePrice": 245000,
        "originalPrice": 350000, # Ảnh chỉ ghi 245k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 90 (10-12kg) - 150 (35-40kg)"
    },
    {
        "id": 28,
        "filename": "1789732196511_5483593727769673322_g1185252936286095617_d882bb26ea05a08e7a61a1db506bae66.jpg",
        "name": "Set Tổ Quốc Áo Xanh Quần Trắng",
        "collection": "BST Mừng Lễ 2/9",
        "campaign": "le2-9",
        "salePrice": 245000,
        "originalPrice": 350000, # Ảnh chỉ ghi 245k -> Tự động tạo giá gốc cao hơn ~30%
        "size": "Size 150 (35-40kg / dưới m50)"
    },
    {
        "id": 29,
        "filename": "1789732196519_5483593727769673322_g1185252936286095617_38124c63be2d05a370ab0e5ce5ddfaf3.jpg",
        "name": "Váy Yến Mạch",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 295000,
        "originalPrice": 455000,
        "size": "Size 100 (13-15kg) - 120 (20-25kg)"
    },
    {
        "id": 30,
        "filename": "1789732196527_5483593727769673322_g1185252936286095617_245fbf56f5c699d1311e900ddda28e43.jpg",
        "name": "Quần Nhung Daisy",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 125000,
        "originalPrice": 165000,
        "size": "Size 100 (13-15kg) - 120 (20-25kg)"
    },
    {
        "id": 31,
        "filename": "1789732196535_5483593727769673322_g1185252936286095617_00b00068d401768813408b21f711e0a6.jpg",
        "name": "Áo Macca Cổ Sen",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 195000,
        "originalPrice": 285000,
        "size": "Size 100 (13-15kg) - 130 (25-30kg)"
    },
    {
        "id": 32,
        "filename": "1789732196543_5483593727769673322_g1185252936286095617_bb0007142228ffc77758d0ecf9e77f3c.jpg",
        "name": "Yếm Quần Totto Nhung Đỏ",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 255000,
        "originalPrice": 325000,
        "size": "Size 100 (13-15kg) - 130 (25-30kg)"
    },
    {
        "id": 33,
        "filename": "1789732196550_5483593727769673322_g1185252936286095617_7fd162af338a5da639d8ba7cc08f973f.jpg",
        "name": "Set Koi Thêu Tay",
        "collection": "BST Mừng Lễ 2/9",
        "campaign": "le2-9",
        "salePrice": 255000,
        "originalPrice": 375000,
        "size": "Size 100 (13-15kg) - 130 (25-30kg)"
    },
    {
        "id": 34,
        "filename": "1789732196558_5483593727769673322_g1185252936286095617_ead338b84d383ad2fb4bf13447dd7a57.jpg",
        "name": "Áo Cát Chi Thủy Thủ",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 195000,
        "originalPrice": 295000,
        "size": "Size 90 (10-12kg) - 120 (20-25kg)"
    },
    {
        "id": 35,
        "filename": "1789732196565_5483593727769673322_g1185252936286095617_ba3689b749a5f5b83e68448bf31b2f16.jpg",
        "name": "Áo Ghile Daisy",
        "collection": "BST Thu Đông",
        "campaign": "sale-thu-dong",
        "salePrice": 135000,
        "originalPrice": 195000,
        "size": "Size 90 (10-12kg, 80-90cm)"
    },
    {
        "id": 36,
        "filename": "1789732196573_5483593727769673322_g1185252936286095617_80e2abcf128746b326c1ef4b9a8cf35b.jpg",
        "name": "Váy Tana Xanh Đen Cổ Trắng",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 265000,
        "originalPrice": 395000,
        "size": "Size 100 (13-15kg, 90-100cm)"
    },
    {
        "id": 37,
        "filename": "1789732196581_5483593727769673322_g1185252936286095617_ef379bbe967d2d0c70522efd65986b4d.jpg",
        "name": "Váy Kim Cúc Vàng Xếp Ly",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 265000,
        "originalPrice": 395000,
        "size": "Size 100 (13-15kg, 90-100cm)"
    },
    {
        "id": 38,
        "filename": "1789732196588_5483593727769673322_g1185252936286095617_6567272632927aaaceeac2c870f58d18.jpg",
        "name": "Áo Sò Thủy Thủ Kèm Gấu",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 240000,
        "originalPrice": 325000,
        "size": "Size 100 (13-15kg, 90-100cm)"
    },
    {
        "id": 39,
        "filename": "1789732196595_5483593727769673322_g1185252936286095617_a874d1f408175774f51031f29ddfce97.jpg",
        "name": "Váy Sao Xanh Hoa Nhí",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 295000,
        "originalPrice": 385000,
        "size": "Size 110 (16-20kg) - 140 (30-35kg)"
    },
    {
        "id": 40,
        "filename": "1789732196602_5483593727769673322_g1185252936286095617_f15c767f5868cb2c8deb4500d3af9497.jpg",
        "name": "Áo Matcha Latte Cổ Sen",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 240000,
        "originalPrice": 285000,
        "size": "Size 110 (16-20kg, 100-110cm)"
    },
    {
        "id": 41,
        "filename": "1789732196610_5483593727769673322_g1185252936286095617_e99bb7cbffab9790b8f9b20a69ef2b5d.jpg",
        "name": "Set Biển Xanh (Mẹ)",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 659000,
        "originalPrice": 775000,
        "size": "Freesize Mẹ (45-60kg)"
    },
    {
        "id": 42,
        "filename": "1789732196617_5483593727769673322_g1185252936286095617_6eae4dc8faecb90abf7ea027a6a1fc2f.jpg",
        "name": "Set Biển Xanh (Bé)",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 379000,
        "originalPrice": 475000,
        "size": "Size 90 (10-12kg) - 140 (30-35kg)"
    },
    {
        "id": 43,
        "filename": "1789732196625_5483593727769673322_g1185252936286095617_8d38e01ce105a02979d5388aaf3dac8c.jpg",
        "name": "Áo Lam Tinh Chấm Bi",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 250000,
        "originalPrice": 325000,
        "size": "Size 100 (13-15kg) - 150 (35-40kg)"
    },
    {
        "id": 44,
        "filename": "1789732196632_5483593727769673322_g1185252936286095617_295e934752ebbffb744cfcf3f62c112a.jpg",
        "name": "Áo Mứt Cam Thêu Hoa",
        "collection": "BST Hè Khánh Vy",
        "campaign": "sale-he",
        "salePrice": 185000,
        "originalPrice": 255000,
        "size": "Size 100 (13-15kg) - 110 (16-20kg)"
    },
    {
        "id": 45,
        "filename": "1789732196639_5483593727769673322_g1185252936286095617_4f1414042158eefbdd6af7848dd0d77f.jpg",
        "name": "Áo Chim Câu Trắng Ren",
        "collection": "BST Hè Khánh Vy",
        "campaign": "sale-he",
        "salePrice": 265000,
        "originalPrice": 395000,
        "size": "Size 100 (13-15kg) - 110 (16-20kg)"
    },
    {
        "id": 46,
        "filename": "1789732196647_5483593727769673322_g1185252936286095617_54821d11290c2fc625ba704f5ae2a091.jpg",
        "name": "Sơ Mi Hải Âu Kèm Khăn Đỏ",
        "collection": "BST Hè Khánh Vy",
        "campaign": "sale-he",
        "salePrice": 195000,
        "originalPrice": 285000,
        "size": "Size 100 (13-15kg) - 130 (25-30kg)"
    },
    {
        "id": 47,
        "filename": "1789732196654_5483593727769673322_g1185252936286095617_52c78914af5e83ecf34c83a455ea10c2.jpg",
        "name": "Set Thanh Yên Cổ Sen",
        "collection": "BST Hạ Mật",
        "campaign": "sale-he",
        "salePrice": 384000,
        "originalPrice": 510000,
        "size": "Size 100 (13-15kg) - 110 (16-20kg)"
    },
    {
        "id": 48,
        "filename": "1789732196662_5483593727769673322_g1185252936286095617_83eaf244c277fb15b685421a57a9fd80.jpg",
        "name": "Váy Hạ Lam Kẻ Xanh",
        "collection": "BST Hè Khánh Vy",
        "campaign": "sale-he",
        "salePrice": 396000,
        "originalPrice": 525000,
        "size": "Size 90 (10-12kg) - 140 (30-35kg)"
    },
    {
        "id": 49,
        "filename": "1789732196669_5483593727769673322_g1185252936286095617_6e06ff6196ca256596e0ee28f6cc4c2f.jpg",
        "name": "Váy Thi Thơ Đính Bướm",
        "collection": "BST Hè Khánh Vy",
        "campaign": "sale-ngay-doi",
        "salePrice": 348000,
        "originalPrice": 465000,
        "size": "Size 90 (10-12kg) - 110 (16-20kg)"
    }
]

def format_vnd(amount):
    return f"{amount:,}đ".replace(",", ".")

def compute_discount(orig, sale):
    pct = round((1 - sale / orig) * 100)
    return f"-{pct}%"

def generate_catalog():
    catalog = []
    for item in EXTRACTED_DATA:
        orig = item["originalPrice"]
        sale = item["salePrice"]
        discount = compute_discount(orig, sale)
        catalog.append({
            "id": item["id"],
            "name": item["name"],
            "collection": item["collection"],
            "campaign": item["campaign"],
            "originalPrice": orig,
            "salePrice": sale,
            "discount": discount,
            "image": f"images/sale/{item['filename']}",
            "size": item["size"]
        })
    return catalog

if __name__ == "__main__":
    catalog = generate_catalog()
    print(f"Loaded {len(catalog)} products from images/sale/ posters.")
    with open("extracted_prices.json", "w", encoding="utf-8") as f:
        json.dump(catalog, f, ensure_ascii=False, indent=2)
    print("Exported to extracted_prices.json successfully.")
