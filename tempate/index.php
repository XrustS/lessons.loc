<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="UTF-8">
		<link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
		<!--<link rel="stylesheet" href="css/normalize.css">-->
		<link rel="stylesheet" href="css/style.css">
		<title>Новостная лента</title>
	</head>
	<body>
		<div class="wrapper">
			<header>		
				<h1>Новости</h1>
				<a href="#">Добавить новость</a>
			</header>
			<section>
				<form action="#" method="post">
					<h1>Добавление новости</h1>
					<label for="title">Введите заголовок новости:</label>				
					<input type="text" name="title" id="title">
					<label for="Text">Текст новости:</label>
					<textarea name="Text" id="Text"></textarea>					
					<input type="submit" value="Добавить новость">
					<input type="reset" value="Очистить поля">
					<input type="file" id="filepath" value="Загрузите файл">
				</form>
			</section>
			<section>
				<div class="news">
					<div class="img"></div>
					<a href="#">Заголовок первой новости</a>
					<div class="textnews">
						<p>По прогнозам Уральского гидрометцентра, в Екатеринбурге в ближайшие дни сохранится тёплая, дождливая погода. Сегодня и завтра по всей области, включая и наш город, пройдут дожди, при этом днём воздух местами прогреется до +20С.
							Что касается сегодняшней погоды в Екатеринбурге, днём ожидается +17...+19С, возможна гроза и резкие порывы ветра до 14 м/с.
							Холодать по области начнёт по ночам: температура будет опускаться до +7...+10С, а в четверг в некоторых районах области возможно похолодание до +3С.
							Погода сохранится такой до конца недели: ждать потепления и отсутствия дождей не стоит до следующего понедельника. </p>
					</div>
				</div>
			</section>
		</div>	
	</body>
</html>