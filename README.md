# CbrCurrency - API курсов валют ЦБ РФ

Веб-приложение для просмотра и анализа курсов валют Центрального Банка Российской Федерации.

## Описание проекта

Проект состоит из двух частей:
- **Backend** (ASP.NET Core 8.0) - REST API для работы с курсами валют
- **Frontend** (Vue 3 + Vite) - веб-интерфейс для просмотра курсов валют, истории изменения курсов и статистики

### Основной функционал:
- Просмотр списка доступных валют
- Получение курсов валют на определенную дату
- Просмотр истории изменения курсов за период
- Статистика по курсам валют
- Графическое отображение динамики курсов
- Темная/светлая тема интерфейса

## Используемые технологии

### Backend (.NET 8.0)
- **ASP.NET Core 8.0** - веб-фреймворк
- **Entity Framework Core 8.0.0** - ORM для работы с базой данных
- **Npgsql.EntityFrameworkCore.PostgreSQL 8.0.0** - провайдер для PostgreSQL
- **Swashbuckle.AspNetCore 6.6.2** - документация API (Swagger)

### Frontend (Vue 3)
- **Vue 3.5.24** - JavaScript фреймворк
- **Vite 7.2.4** - инструмент сборки
- **Vue Router 4.6.4** - маршрутизация
- **Pinia 3.0.4** - управление состоянием
- **Axios 1.13.2** - HTTP клиент
- **Chart.js 4.5.1** + **vue-chartjs 5.3.3** - графики
- **Tailwind CSS 3.4.19** - CSS фреймворк
- **Font Awesome 7.1.0** - иконки

### База данных
- **PostgreSQL** - реляционная база данных

## Структура проекта

```
CbrCurrency/
│
├── CbrCurrenctApi/                    # Backend проект
│   ├── CbrCurrenctApi/
│   │   ├── Controllers/               # API контроллеры
│   │   │   ├── CurrenciesController.cs
│   │   │   ├── RatesController.cs
│   │   │   └── StatsController.cs
│   │   ├── Data/                      # Контекст базы данных
│   │   │   └── AppDbContext.cs
│   │   ├── Models/                    # Модели данных
│   │   │   ├── Currency.cs
│   │   │   ├── ExchangeRate.cs
│   │   │   └── DTO's/                 # Объекты передачи данных
│   │   ├── Services/                  # Бизнес-логика
│   │   │   ├── CurrenciesService.cs
│   │   │   ├── ExchangeRatesService.cs
│   │   │   └── StatsService.cs
│   │   ├── Program.cs                 # Точка входа
│   │   ├── appsettings.json           # Конфигурация
│   │   └── Dockerfile                 # Docker образ
│   └── CbrCurrencyApi.sln             # Solution файл
│
└── CbrCurrencyFrontend/               # Frontend проект
    ├── src/
    │   ├── api/                       # API клиенты
    │   ├── components/                # Vue компоненты
    │   │   ├── common/                # Общие компоненты
    │   │   ├── currency/              # Компоненты валют
    │   │   ├── filters/               # Компоненты фильтров
    │   │   └── stats/                 # Компоненты статистики
    │   ├── router/                    # Роутинг
    │   ├── stores/                    # Pinia stores
    │   ├── utils/                     # Утилиты
    │   └── views/                     # Страницы
    ├── package.json
    └── vite.config.js
```

## Структура базы данных

### Таблица `currencies` (Справочник валют)
| Поле | Тип | Описание |
|------|-----|----------|
| `id` | INT (PK) | Идентификатор |
| `cbr_id` | VARCHAR(20) | ID валюты в системе ЦБ РФ (уникальный) |
| `num_code` | VARCHAR(3) | Цифровой код валюты |
| `char_code` | VARCHAR(3) | Буквенный код валюты (индекс) |
| `nominal` | INT | Номинал |
| `name` | VARCHAR(200) | Название валюты |

**Индексы:**
- Уникальный индекс на `cbr_id`
- Индекс на `char_code` для быстрого поиска

### Таблица `exchange_rates` (Курсы валют)
| Поле | Тип | Описание |
|------|-----|----------|
| `id` | INT (PK) | Идентификатор |
| `date` | DATE | Дата курса (индекс) |
| `currency_id` | INT (FK) | Ссылка на валюту |
| `rate` | DECIMAL(18,6) | Курс валюты |
| `loaded_at` | TIMESTAMP | Время загрузки данных |

**Индексы:**
- Составной уникальный индекс на `(date, currency_id)` - предотвращает дублирование курсов на одну дату
- Индекс на `date` для быстрого поиска по дате

**Связи:**
- `currency_id` → `currencies.id` (каскадное удаление)

## Инструкция по запуску

### Предварительные требования

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL 12+](https://www.postgresql.org/download/)

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd CbrCurrency
```

### 2. Настройка базы данных

1. Создайте базу данных PostgreSQL:
```sql
CREATE DATABASE cbr_currency;
```

Данные в базе загружаются за счет консольного приложения для ежедневной выгрузки курсов валют ЦБР - [CbrCurrencyLoader](https://github.com/Donangeb/CbrCurrencyLoader).

2. Скопируйте файл примера конфигурации:

**Windows:**
```bash
cd CbrCurrenctApi/CbrCurrenctApi
copy appsettings.example.json appsettings.Development.json
```

**Linux/Mac:**
```bash
cd CbrCurrenctApi/CbrCurrenctApi
cp appsettings.example.json appsettings.Development.json
```

3. Отредактируйте `appsettings.Development.json` и укажите параметры подключения к базе данных:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=cbr_currency;Username=your_user;Password=your_password"
  }
}
```

4. Примените миграции (если используются):
```bash
dotnet ef database update
```

### 3. Запуск Backend

```bash
cd CbrCurrenctApi/CbrCurrenctApi
dotnet restore
dotnet run
```

Backend будет доступен по адресу:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `https://localhost:5001/swagger`

### 4. Запуск Frontend

1. Скопируйте файл примера конфигурации:

**Windows:**
```bash
cd CbrCurrencyFrontend
copy env.example .env
```

**Linux/Mac:**
```bash
cd CbrCurrencyFrontend
cp env.example .env
```

2. Отредактируйте `.env` и укажите URL бэкенда (если отличается от стандартного):
```
VITE_API_BASE_URL=http://localhost:5000
```

3. Установите зависимости и запустите:
```bash
npm install
npm run dev
```

Frontend будет доступен по адресу: `http://localhost:5173`

### 5. Запуск через Docker (опционально)

```bash
cd CbrCurrenctApi/CbrCurrenctApi
docker build -t cbrcurrency-api .
docker run -p 8080:8080 cbrcurrency-api
```

## API Endpoints

### Currencies
- `GET /api/currencies` - Получить список всех валют

### Rates
- `GET /api/rates?date=YYYY-MM-DD` - Получить курсы валют на указанную дату
- `GET /api/rates/history?code=XXX&from=YYYY-MM-DD&to=YYYY-MM-DD` - Получить историю курса валюты за период

### Stats
- `GET /api/stats` - Получить статистику по курсам валют

## Конфигурация

### Backend
Основные настройки находятся в `appsettings.json`:
- `ConnectionStrings:DefaultConnection` - строка подключения к PostgreSQL
- `Logging` - настройки логирования
- `AllowedHosts` - разрешенные хосты для CORS

### Frontend
Настройки API находятся в файле `.env`:
- `VITE_API_BASE_URL` - базовый URL бэкенд API (по умолчанию: `http://localhost:5000`)
- Скопируйте `env.example` в `.env` и настройте при необходимости

## Разработка

### Структура кода

- **Controllers** - обрабатывают HTTP запросы и возвращают ответы
- **Services** - содержат бизнес-логику приложения
- **Models** - модели данных и DTO
- **Data** - контекст Entity Framework Core

### Линтинг и форматирование

Для Backend используется стандартный стиль C# от Microsoft.

Для Frontend рекомендуется использовать ESLint и Prettier.

## Лицензия

[Указать лицензию проекта]

