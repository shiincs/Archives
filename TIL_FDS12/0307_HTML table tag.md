# HTML Table Tag

테이블 예제

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>table</title>
</head>

<body>
  <table border="1" cellspacing="0" cellpadding="0">
    <tr>
      <td>세계지도</td>
      <td>세계날씨</td>
      <td>세계시간</td>
      <td>국가번호</td>
      <td>환율</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="8">
        <table>
          <tbody>
            <tr>
              <td rowspan="3">text</td>
              <td>text</td>
            </tr>
            <tr>
              <td>text</td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td rowspan="3">image</td>
              <td>image</td>
            </tr>
            <tr>
              <td>=</td>
            </tr>
            <tr>
              <td>image</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td colspan="8">
        <table>
          <thead>
            <tr>
              <th>통화명</th>
              <th>매매기준율</th>
              <th>전일대비</th>
              <th>등락율</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>미국</td>
              <td>22</td>
              <td>33</td>
              <td>44</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>
```

