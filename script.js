// Script for real estate feng shui analysis
document.addEventListener('DOMContentLoaded', function() {
    // Get references to input elements and result div
    var birthDateInput = document.getElementById('ngaySinh');
    var birthHourInput = document.getElementById('gioSinh');
    var genderInput = document.getElementById('gioiTinh');
    var buildYearInput = document.getElementById('namXayNha');
    var houseDirInput = document.getElementById('huongNha');

    var slopeCheckbox = document.getElementById('datDoc');
    var slopeDirInput = document.getElementById('huongDoc');
    var roadCheckbox = document.getElementById('duongDam');
    var roadDirInput = document.getElementById('huongDuong');
    var waterCheckbox = document.getElementById('nuocTruoc');
    var waterDistInput = document.getElementById('khoangCachNuoc');
    var hospitalCheckbox = document.getElementById('benhVien');
    var templeCheckbox = document.getElementById('chua');
    var churchCheckbox = document.getElementById('nhaTho');
    var cemeteryCheckbox = document.getElementById('nghiaDia');

    var resultDiv = document.getElementById('result');
    var btnCheck = document.getElementById('btnCheck');

    btnCheck.addEventListener('click', function() {
        // Clear previous results
        resultDiv.innerHTML = '';

        // Parse inputs
        var birthDate = new Date(birthDateInput.value);
        var birthYear = birthDate.getFullYear();
        var gender = genderInput.value; // 'Nam' or 'Nữ'
        var buildYear = parseInt(buildYearInput.value);

        // 1. Tính Can Chi và Ngũ Hành nạp âm
        var stems = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
        var branches = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
        var indexStem = (birthYear - 4) % 10;
        if (indexStem < 0) indexStem += 10;
        var indexBranch = (birthYear - 4) % 12;
        if (indexBranch < 0) indexBranch += 12;
        var can = stems[indexStem];
        var chi = branches[indexBranch];
        // Ngũ hành nạp âm mapping (Lục thập hoa giáp)
        var napat = [
            'Hải Trung Kim','Hải Trung Kim',
            'Lư Trung Hỏa','Lư Trung Hỏa',
            'Đại Lâm Mộc','Đại Lâm Mộc',
            'Lộ Bàng Thổ','Lộ Bàng Thổ',
            'Kiếm Phong Kim','Kiếm Phong Kim',
            'Sơn Đầu Hỏa','Sơn Đầu Hỏa',
            'Giản Hạ Thủy','Giản Hạ Thủy',
            'Thành Đầu Thổ','Thành Đầu Thổ',
            'Bạch Lạp Kim','Bạch Lạp Kim',
            'Dương Liễu Mộc','Dương Liễu Mộc',
            'Tỉnh Tuyền Thủy','Tỉnh Tuyền Thủy',
            'Ốc Thượng Thổ','Ốc Thượng Thổ',
            'Phích Lịch Hỏa','Phích Lịch Hỏa',
            'Tùng Bách Mộc','Tùng Bách Mộc',
            'Trường Lưu Thủy','Trường Lưu Thủy',
            'Sa Thạch Kim','Sa Thạch Kim',
            'Sơn Hạ Hỏa','Sơn Hạ Hỏa',
            'Bình Địa Mộc','Bình Địa Mộc',
            'Bích Thượng Thổ','Bích Thượng Thổ',
            'Kim Bạc Kim','Kim Bạc Kim',
            'Phúc Đăng Hỏa','Phúc Đăng Hỏa',
            'Thiên Hà Thủy','Thiên Hà Thủy',
            'Đại Trạch Thổ','Đại Trạch Thổ',
            'Xoa Xuyến Kim','Xoa Xuyến Kim',
            'Tang Đố Mộc','Tang Đố Mộc',
            'Đại Khê Thủy','Đại Khê Thủy',
            'Sa Trung Thổ','Sa Trung Thổ',
            'Thiên Thượng Hỏa','Thiên Thượng Hỏa',
            'Thạch Lựu Mộc','Thạch Lựu Mộc',
            'Đại Hải Thủy','Đại Hải Thủy'
        ];
        var index60 = (birthYear - 4) % 60;
        if (index60 < 0) index60 += 60;
        var napAm = napat[index60];

        // 2. Tính hạn tuổi: Kim Lâu, Hoàng Ốc, Tam Tai
        var ageMu = buildYear - birthYear + 1;

        // Kim Lâu
        var kimLau = '';
        if (gender === 'Nam') {
            var rem = ageMu % 9;
            if ([1,3,6,8].includes(rem)) {
                if (rem === 1) kimLau = 'Kim Lâu Thân';
                else if (rem === 3) kimLau = 'Kim Lâu Thê';
                else if (rem === 6) kimLau = 'Kim Lâu Tử';
                else if (rem === 8) kimLau = 'Kim Lâu Súc';
            } else {
                kimLau = 'Không phạm';
            }
        } else {
            var lastDigit = ageMu % 10;
            if ([1,3,6,8].includes(lastDigit)) {
                if (lastDigit === 1) kimLau = 'Kim Lâu Thân';
                else if (lastDigit === 3) kimLau = 'Kim Lâu Thê';
                else if (lastDigit === 6) kimLau = 'Kim Lâu Tử';
                else if (lastDigit === 8) kimLau = 'Kim Lâu Súc';
            } else {
                kimLau = 'Không phạm';
            }
        }

        // Hoàng Ốc
        var hoangOc = '';
        var mod6 = ageMu % 6;
        var hoangOcMap = {
            1: 'Nhất Cát',
            2: 'Nhì Nghi',
            3: 'Tam Địa Sát',
            4: 'Tứ Tấn Tài',
            5: 'Ngũ Thọ Tử',
            0: 'Lục Hoang Ốc'
        };
        hoangOc = hoangOcMap[mod6];
        // Các cung xấu: Tam Địa Sát, Ngũ Thọ Tử, Lục Hoang Ốc
        if (mod6 === 3 || mod6 === 5 || mod6 === 0) {
            hoangOc += ' (Xấu)';
        }

        // Tam Tai
        var tamTai = 'Không phạm';
        var tamTaiMap = {
            'Thân': ['Dần','Mão','Thìn'],
            'Tý':   ['Dần','Mão','Thìn'],
            'Thìn': ['Dần','Mão','Thìn'],
            'Tỵ':   ['Hợi','Tý','Sửu'],
            'Dậu':  ['Hợi','Tý','Sửu'],
            'Sửu':  ['Hợi','Tý','Sửu'],
            'Dần':  ['Thân','Dậu','Tuất'],
            'Ngọ':  ['Thân','Dậu','Tuất'],
            'Tuất': ['Thân','Dậu','Tuất'],
            'Hợi':  ['Tỵ','Ngọ','Mùi'],
            'Mão':  ['Tỵ','Ngọ','Mùi'],
            'Mùi':  ['Tỵ','Ngọ','Mùi']
        };
        var idxBuild = (buildYear - 4) % 12;
        if (idxBuild < 0) idxBuild += 12;
        var chiBuild = branches[idxBuild];
        if (tamTaiMap[chi] && tamTaiMap[chi].includes(chiBuild)) {
            tamTai = 'Phạm hạn Tam Tai';
        }

        // 3. Tính Cung phi bát trạch
        var yearLast2 = birthYear % 100;
        var a = Math.floor(yearLast2 / 10) + (yearLast2 % 10);
        if (a > 9) {
            a = Math.floor(a/10) + (a % 10);
        }
        var b;
        if (birthYear < 2000) {
            if (gender === 'Nam') {
                b = 10 - a;
            } else {
                b = 5 + a;
            }
        } else {
            if (gender === 'Nam') {
                b = 9 - a;
            } else {
                b = 6 + a;
            }
        }
        if (b > 9) {
            b = Math.floor(b/10) + (b % 10);
        }
        if (b === 0) b = 9;
        // Xử lý trường hợp kết quả = 5
        if (b === 5) {
            b = (gender === 'Nam') ? 2 : 8;
        }
        var cungMap = {
            1: 'Khảm (Thủy, hướng Bắc)',
            2: 'Khôn (Thổ, hướng Tây Nam)',
            3: 'Chấn (Mộc, hướng Đông)',
            4: 'Tốn (Mộc, hướng Đông Nam)',
            6: 'Càn (Kim, hướng Tây Bắc)',
            7: 'Đoài (Kim, hướng Tây)',
            8: 'Cấn (Thổ, hướng Đông Bắc)',
            9: 'Ly (Hỏa, hướng Nam)'
        };
        var cungPhi = cungMap[b];

        // 4. Phân tích các yếu tố phong thủy xấu
        var badFactors = [];
        // Hướng nhà (chỉ ghi nhận hướng nhà hiện tại)
        if (houseDirInput.value) {
            badFactors.push('Hướng nhà: ' + houseDirInput.value);
        }
        if (slopeCheckbox.checked) {
            badFactors.push('Đất dốc xuống mặt tiền (Hướng dốc: ' + slopeDirInput.value + ')');
        }
        if (roadCheckbox.checked) {
            badFactors.push('Đường đâm thẳng vào cửa (Hướng đường: ' + roadDirInput.value + ')');
        }
        if (waterCheckbox.checked) {
            var dist = waterDistInput.value;
            badFactors.push('Có mặt nước trước cửa (Cách ' + dist + ' m)');
        }
        if (hospitalCheckbox.checked) {
            badFactors.push('Bệnh viện trước mặt');
        }
        if (templeCheckbox.checked) {
            badFactors.push('Chùa/đình/miếu trước cửa');
        }
        if (churchCheckbox.checked) {
            badFactors.push('Nhà thờ trước cửa');
        }
        if (cemeteryCheckbox.checked) {
            badFactors.push('Nghĩa địa trước mặt');
        }

        // Hiển thị kết quả
        var html = '<h2>Kết quả phân tích</h2>';
        html += '<h3>Thông tin năm sinh, mệnh ngũ hành:</h3>';
        html += '<ul>';
        html += '<li>Năm sinh (Can Chi): ' + can + ' ' + chi + '</li>';
        html += '<li>Mệnh ngũ hành nạp âm: ' + napAm + '</li>';
        html += '</ul>';
        html += '<h3>Các hạn tuổi:</h3>';
        html += '<ul>';
        html += '<li>Kim Lâu: ' + kimLau + '</li>';
        html += '<li>Hoàng Ốc: ' + hoangOc + '</li>';
        html += '<li>Tam Tai: ' + tamTai + '</li>';
        html += '</ul>';
        html += '<h3>Cung phi bát trạch:</h3>';
        html += '<ul>';
        html += '<li>Cung phi: ' + cungPhi + '</li>';
        html += '</ul>';
        html += '<h3>Các yếu tố phong thủy xấu:</h3>';
        if (badFactors.length > 0) {
            html += '<ul>';
            for (var i = 0; i < badFactors.length; i++) {
                html += '<li>' + badFactors[i] + '</li>';
            }
            html += '</ul>';
        } else {
            html += '<p>Không phát hiện yếu tố phong thủy xấu theo dữ liệu đầu vào.</p>';
        }
        resultDiv.innerHTML = html;
    });
});
