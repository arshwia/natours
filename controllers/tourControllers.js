const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../dev-data/data/tours-simple.json`
    )
);

// چک کردن این که ایا اون id که استفاده شده موجود هست یا نه
const checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);

    // چک میکنیم که ایا اون ایدی که کلاینت داده اصلا وجود داره یا نه
    if (req.params.id * 1 + 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    next();
};

const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message:
                'this is a bad request💔 missing name or price',
        });
    }

    next();
};

// فرستان تمام ترو ها به کلاینت با استفاده از json
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        time: req.reqTime,
        results: tours.length,
        data: {
            tours: tours,
        },
    });
};

// فرستادن یک تور خاص با استفاده از ای دی
const getTour = (req, res) => {
    // ایدی رو با استفاده از یک ضرب دیتا تایپش رو عوض میکنیم
    const id = req.params.id * 1;
    // اون تور خاص رو اسخراج میکنیم
    const tour = tours.find((el) => el.id === id);

    // ارسال دیتا
    res.status(200).json({
        status: 'success',
        data: {
            tours: tour,
        },
    });
};

// ساخت یک تور جدید و زخیره کردن اون داخل فایل جیسون مون
const creatTour = (req, res) => {
    delete req.body.id;
    // ایدی که از قبل وجود داشت رو به دست میاریم و مثبت یک میکنیم
    const newId = tours[tours.length - 1].id + 1;
    // یک ابجکت جدید میسازیم ایدیش با ایدی که ما دادیم ساخته بشه و بقیش با ریکویست بادی
    const newTour = Object.assign(
        { id: newId },
        req.body
    );

    // و اون رو به تور های قبلی که داشتیم اضافه میکنیم
    tours.push(newTour);

    // داخل فایل هم میزاریمش
    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            if (err) res.status(404).send(err);

            res.status(201).json({
                status: 'success',
                data: {
                    tours: newTour,
                },
            });
        }
    );
};

// ادیت یک تور خاص
const updateTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    //داخل ریکویست بادی نتونه ایدی رو عوض کنه
    delete req.body.id;

    //جای گذاری مقادیر جدید
    tours[id] = {
        ...tours[id],
        ...req.body,
    };

    // اپ دید کردن فایل دیتامون
    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'err',
                    message: 'Cannot write file',
                });
            }

            res.status(200).json({
                status: 'success',
                data: {
                    tour: tours[id],
                },
            });
        }
    );
};

// پاک کردن یک تور خاص
const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    tours.splice(id, 1);

    // پاک کردن اون ایدی از دیتا بیس یا همون فایلمون
    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'err',
                    message: 'Cannot write file',
                });
            }

            res.status(204).json({
                status: 'success',
                data: null,
            });
        }
    );
};

module.exports = {
    getAllTours,
    getTour,
    creatTour,
    updateTour,
    deleteTour,
    checkID,
    checkBody,
};
