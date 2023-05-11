# Информационная система проверки ВКР на объём заимствований

Данный проект представляет собой информационную систему для проверки выпускных квалификационных работ (ВКР) на объём заимствований.

## Описание

Информационная система позволяет загрузить документ ВКР в формате docx и произвести его анализ на предмет объёма заимствований. В результате анализа система выдает отчет о процентном соотношении объема заимствований в работе.

## Установка

1. Склонируйте репозиторий на свой компьютер.
2. Установите все зависимости, выполнив команду `yarn install`.
3. Запустите миграции базы данных `yarn migration:run`.
4. Запустите приложение, выполнив команду `yarn start`.

## Использование

1. Откройте веб-интерфейс приложения в браузере по адресу `http://HOST:PORT`.
2. Нажмите кнопку "Выбрать файл" и выберите документ ВКР в формате docx.
3. Нажмите кнопку "Загрузить" для загрузки документа и запуска анализа.
4. После завершения анализа система выдаст отчет о процентном соотношении объема заимствований в работе.

## Авторы

* Гамбаров Д.И. - разработчик

## Лицензия

Данный проект распространяется под лицензией LICENSE. Подробности можно узнать в файле `LICENSE`.
