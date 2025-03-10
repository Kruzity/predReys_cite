const organizations = [
  {
    id: 1,
    name: 'ООО "Транс Логистика"',
    inn: '1234567890',
    ogrn: '1027700123456',
    phone: '+7 (495) 123 45 67',
    vehicles: [
      {
        id: 101,
        organizationId: 1,
        title: '45-001234', 
        brand: 'Volvo', 
        model: 'FH16',
        licensePlate: 'A123BC 77',
        trailer: {
          brand: 'Schmitz',
          model: 'SCS 24',
          licensePlate: 'B456MN 78',
          trailertype: 'Полуприцеп',
          owner: 'ООО "ЛогистикаY"',
        },
        owner: 'ООО "АрендаКар"',
        addresses: [
          'Москва, ул. Промышленная, 1',
          'Москва, ул. Сакура, 10',
          'Москва, ул. Сен-Жак, 5',
        ],
      },
      {
        id: 102,
        organizationId: 1,
        title: '45-001235', 
        brand: 'Mercedes', 
        model: 'Actros',
        licensePlate: 'Y456KH 99',
        trailer: {
          brand: 'Krone',
          model: 'Profiliner',
          licensePlate: 'C789ZX 45',
          trailertype: 'Прицеп',
          owner: 'ООО "ЛогистикаY"',
        },
        owner: 'ООО "Логистика"',
        addresses: ['Санкт-Петербург, наб. реки Фонтанки, 2'],
      },
      {
        id: 103,
        organizationId: 1,
        title: '45-001135', 
        brand: 'Mercesdff', 
        model: 'Acsdfos',
        licensePlate: 'Y44356KH 99',
        trailer: {
          brand: 'Kronech',
          model: 'Frofiliner',
          licensePlate: 'C789ZX 45',
          trailertype: 'Прицеп',
          owner: 'ООО "ЛогистикаY"',
        },
        owner: 'ООО "Логистика"',
        addresses: ['Санкт-Петербург, наб. реки Фонтанки, 2'],
      },
      {
        id: 104,
        organizationId: 1,
        title: '45-001335', 
        brand: 'Mercesdfdf', 
        model: 'Acsdfosa',
        licensePlate: 'Y44356KHD 99',
        trailer: {
          brand: 'KronechD',
          model: 'Drofiliner',
          licensePlate: 'D789ZX 45',
          trailertype: 'Полуприцеп',
          owner: 'ООО "ЛогистикаY"',
        },
        owner: 'ООО "Логистика"',
        addresses: ['Санкт-Петербург, наб. реки Фонтанки, 2'],
      },
      {
        id: 105,
        organizationId: 1,
        title: '45-0013325', 
        brand: 'Mercesdfdddf', 
        model: 'Acsdfosaaaaa',
        licensePlate: 'Y44356KHD 399',
        owner: 'ООО "ЛогистикаY"',
        addresses: ['Санкт-Петербург, наб. реки Фонтанки, 4'],
      },
    ],
    drivers: [
      {
        id: 1,
        organizationId: 1,
        name: "Иванов Иван Иванович",
        phone: "+7 (987) 654-32-10",
        telegram: "@ivanov_driver",
        licenseSeries: "45 06",
        licenseNumber: "123456",
        licenseIssueDate: "01.01.2015",
        licenseCategories: ["B", "C"],
        snils: "123-456-789 00"
      },
      {
        id: 2,
        organizationId: 1,
        name: "Петрова Мария Федоровна",
        phone: "+7 (987) 654-32-11",
        telegram: "@petrova_driver",
        licenseSeries: "45 07",
        licenseNumber: "123457",
        licenseIssueDate: "02.02.2016",
        licenseCategories: ["B"],
        snils: "987-654-321 01"
      },
    ],
    addresses: [
      'Москва, ул. Промышленная, 1',
      'Москва, ул. Сакура, 10',
      'Москва, ул. Сен-Жак, 5',
    ],
    orders: [
      {
        id: 201,
        trackNumber: 'CDEK-20230101-0001',
        requests: [
          {
            id: 1,
            date: '01.01.2025',
            vehicle: {
              brand: 'Volvo',
              model: 'FH16',
              licensePlate: 'A123BC 77',
            },
            trailer: {
              brand: 'Schmitz',
              model: 'SCS 24',
              licensePlate: 'B456MN 78',
              trailertype: 'Полуприцеп',
            },
            travelForms: 'Т3 (легковые до 3,5 т)',
            tripSheets: 5,
            sum: 100000,
            driver: "Иванов Иван Иванович",
            releaseAddress: 'Москва, ул. Промышленная, 1',
            deliveryAddress: 'Москва, ул. Сакура, 10',
            recipient: {
              name: 'Сидоров Сидор Сидорович',
              phone: '+7 (912) 345-67-89',
            },
          },
          {
            id: 2,
            date: '02.01.2025',
            vehicle: {
              brand: 'Mercedes',
              model: 'Actros',
              licensePlate: 'Y456KH 99',
            },
            trailer: {
              brand: 'Krone',
              model: 'Profiliner',
              licensePlate: 'C789ZX 45',
              trailertype: 'Прицеп',
            },
            travelForms: '4П (грузовые >3,5 т)',
            tripSheets: 3,
            sum: 75000,
            driver: "Петрова Мария Федоровна",
            releaseAddress: 'Москва, ул. Сен-Жак, 5',
            deliveryAddress: 'Санкт-Петербург, наб. реки Фонтанки, 2',
            recipient: {
              name: 'Иванова Анна Сергеевна',
              phone: '+7 (921) 456-78-90',
            },
          },
        ],
      },
      {
        id: 202,
        trackNumber: 'CDEK-20230101-0002',
        requests: [
          {
            id: 3,
            date: '03.01.2025',
            vehicle: {
              brand: 'Volvo',
              model: 'FH16',
              licensePlate: 'A123BC 77',
            },
            trailer: {
              brand: 'Schmitz',
              model: 'SCS 24',
              licensePlate: 'B456MN 78',
            },
            travelForms: '4С (грузовые >3,5 т)',
            tripSheets: 7,
            sum: 120000,
            driver: "Иванов Иван Иванович",
            releaseAddress: 'Москва, ул. Промышленная, 1',
            deliveryAddress: 'Москва, ул. Сакура, 10',
            recipient: {
              name: 'Кузнецов Петр Алексеевич',
              phone: '+7 (931) 567-89-01',
            },
          },
        ],
      },
    ],
    travelForms: [
      "Т3 (легковые до 3,5 т)",
      "4С (грузовые >3,5 т)",
      "4П (грузовые >3,5 т)",
      "ЭСМ-2 (строительная)",
      "Форма 3 спец (специального авто)",
      "Ф412 (трактор)",
      "Т6 спец (автобус необщ пользования)",
      "ПГ-1 (для ИП)",
      "Автокран (стрелового самоходного)",
      "4М (международного)"
    ],
    messageTypes: [
      "Городское",
      "Пригородное",
      "Междугородное"
    ],
    transportationTypes: [
      "Коммерческие перевозки",
      "Перевозки для собственных нужд",
      "Передвижение и работа специальных ТС"
    ],
    schedules: [
      "Рабочие дни",
      "Командировка",
      "Ежедневно по дням / сменам",
      "Командировка + Ежедневно"
    ]
  },
  {
    id: 2,
    name: 'ИП "Логистик Сервис"',
    inn: '9876543210',
    ogrn: '2037700123456',
    phone: '+7 (495) 765 43 21',
    vehicles: [],
    addresses: [],
    travelForms: [
      "Т3 (легковые до 3,5 т)",
      "4С (грузовые >3,5 т)",
      "4П (грузовые >3,5 т)",
      "ЭСМ-2 (строительная)",
      "Форма 3 спец (специального авто)",
      "Ф412 (трактор)",
      "Т6 спец (автобус необщ пользования)",
      "ПГ-1 (для ИП)",
      "Автокран (стрелового самоходного)",
      "4М (международного)"
    ],
    messageTypes: [
      "Городское",
      "Пригородное",
      "Междугородное"
    ],
    transportationTypes: [
      "Коммерческие перевозки",
      "Перевозки для собственных нужд",
      "Передвижение и работа специальных ТС"
    ],
    schedules: [
      "Рабочие дни",
      "Командировка",
      "Ежедневно по дням / сменам",
      "Командировка + Ежедневно"
    ]
  },
  {
    id: 3,
    name: 'АО "Строй Прогресс"',
    inn: '0987654321',
    ogrn: '2047700123456',
    phone: '+7 (495) 987 65 43',
    vehicles: [],
    addresses: [],
    travelForms: [
      "Т3 (легковые до 3,5 т)",
      "4С (грузовые >3,5 т)",
      "4П (грузовые >3,5 т)",
      "ЭСМ-2 (строительная)",
      "Форма 3 спец (специального авто)",
      "Ф412 (трактор)",
      "Т6 спец (автобус необщ пользования)",
      "ПГ-1 (для ИП)",
      "Автокран (стрелового самоходного)",
      "4М (международного)"
    ],
    messageTypes: [
      "Городское",
      "Пригородное",
      "Междугородное"
    ],
    transportationTypes: [
      "Коммерческие перевозки",
      "Перевозки для собственных нужд",
      "Передвижение и работа специальных ТС"
    ],
    schedules: [
      "Рабочие дни",
      "Командировка",
      "Ежедневно по дням / сменам",
      "Командировка + Ежедневно"
    ]
  },
];

export default organizations;