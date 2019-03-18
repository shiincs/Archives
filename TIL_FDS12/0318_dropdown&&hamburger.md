# 드롭다운 메뉴 만들기

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>dropdown</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <style>
    *,
    *::before,
    *::after {
      padding: 0;
      margin: 0;
      border: 0;
      box-sizing: border-box;
    }

    body {
      font-size: 10px;
    }

    .title {
      font-size: 2rem;
      margin-bottom: 20px;
    }

    .nav-wrapper {
      display: inline-block;
    }

    .list-wrapper {
      position: relative;
    }

    ul {
      list-style: none;
    }

    .list-item {
      background: #333;
      color: #fff;
      font-size: 1.3rem;
      padding: 10px 15px;
      width: 150px;
      border: 1px solid #333;
    }

    .list-item:hover {
      background: #fff;
      color: #333;
      border-right: 1px solid #fff;
    }

    .list-layer {
      display: none;
      position: absolute;
      top: 0;
      left: 150px;
      color: black;
      width: 200px;
      border-top: 1px solid #333;
      border-bottom: 1px solid #333;
      border-right: 1px solid #333;
    }

    .list-layer.active {
      display: inline-block;
    }

    .layer-item {
      font-size: 1rem;
      padding: 10px 15px;
    }
  </style>
</head>

<body>
  <h1 class="title">드롭다운 메뉴 실습</h1>
  <nav class="nav-wrapper">
    <ul class="list-wrapper">
      <li class="list-item">
        브랜드패션
        <ul class="list-layer">
          <li class="layer-item">브랜드 여성의류</li>
          <li class="layer-item">브랜드 여성신발</li>
          <li class="layer-item">브랜드 시계</li>
          <li class="layer-item">디자이너 여성의류</li>
          <li class="layer-item">브랜드 남성의류</li>
          <li class="layer-item">브랜드 남성신발</li>
        </ul>
      </li>
      <li class="list-item">
        의류/잡화
        <ul class="list-layer">
          <li class="layer-item">여성의류</li>
          <li class="layer-item">여성신발</li>
          <li class="layer-item">여성가방</li>
          <li class="layer-item">남성의류</li>
          <li class="layer-item">남성신발</li>
          <li class="layer-item">남성가방</li>
        </ul>
      </li>
      <li class="list-item">
        뷰티
        <ul class="list-layer">
          <li class="layer-item">스킨케어</li>
          <li class="layer-item">메이크업</li>
          <li class="layer-item">선케어</li>
          <li class="layer-item">남성화장품</li>
          <li class="layer-item">클렌징/필링</li>
          <li class="layer-item">향수</li>
        </ul>
      </li>
      <li class="list-item">
        레저/자동차
        <ul class="list-layer">
          <li class="layer-item">스포츠 의류</li>
          <li class="layer-item">등산/아웃도어</li>
          <li class="layer-item">캠핑</li>
          <li class="layer-item">자동차용품</li>
          <li class="layer-item">스포츠 잡화</li>
          <li class="layer-item">자전거</li>
        </ul>
      </li>
      <li class="list-item">
        식품
        <ul class="list-layer">
          <li class="layer-item">농산</li>
          <li class="layer-item">수산</li>
          <li class="layer-item">축산</li>
          <li class="layer-item">반찬/간편가정식</li>
          <li class="layer-item">김치</li>
          <li class="layer-item">가공식품</li>
        </ul>
      </li>
    </ul>

  </nav>


  <script>
    $( document ).ready( function () {
      $( '.list-item' ).on( 'mouseover', function () {
        $( this ).children().addClass( 'active' );
      } )
      $( '.list-item' ).on( 'mouseout', function () {
        $( this ).children().removeClass( 'active' );
      } )
    } )
  </script>
</body>

</html>
```



# 햄버거 메뉴 만들기

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>햄버거 메뉴 실습</title>

  <style>
    *,
    *::before,
    *::after {
      padding: 0;
      margin: 0;
      border: 0;
      box-sizing: border-box;
    }

    .hamburger-btn {
      display: block;
    }

    .menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: #000;
      opacity: 0;
      z-index: 0;
      display: none;
      transition: all 1s;
    }

    .menu-overlay.active {
      display: block;
      opacity: 0.7;
    }

    .menu-list {
      list-style: none;
      border: 1px solid red;
      display: inline-block;
      width: 150px;
      position: relative;
      left: -150px;
      z-index: 100;
      background-color: #fff;
      transition: all 0.5s linear;
    }

    .menu-list.active {
      left: 0;
    }

    .menu-item {
      text-align: right;
    }
  </style>
</head>

<body>
  <button class="hamburger-btn">햄버거</button>
  <div class="menu-overlay"></div>
  <ul class="menu-list">
    <li class="menu-item"><a href="#">빅맥</a></li>
    <li class="menu-item"><a href="#">상하이</a></li>
    <li class="menu-item"><a href="#">불고기</a></li>
    <li class="menu-item"><a href="#">와퍼</a></li>
    <li class="menu-item"><a href="#">몬스터</a></li>
  </ul>


  <script>
    document.querySelector( '.hamburger-btn' ).addEventListener( 'click', function () {
      document.querySelector( '.menu-overlay' ).classList.toggle( 'active' )
      document.querySelector( '.menu-list' ).classList.toggle( 'active' )
    } )

    document.querySelector( '.menu-overlay' ).addEventListener( 'click', function () {
      document.querySelector( '.menu-overlay' ).classList.toggle( 'active' )
      document.querySelector( '.menu-list' ).classList.toggle( 'active' )
    } )
  </script>
</body>

</html>
```

