const fs = require('fs');
const express = require('express');

const app = express();

//اضافه کردن یک میدل ور برای استفاده از ریکویست دات بادی
app.use(express.json());

// خاندن فایل به صورت گلوبال تا لازم نشود هر دفعه برای هر ریکویست دوباره فایل را بخونیم
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// فرستان تمام ترو ها به کلاینت با استفاده از json
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours,
        },
    });
});

// فرستادن یک تور خاص با استفاده از ای دی
app.get('/api/v1/tours/:id', (req, res) => {
    // ایدی رو با استفاده از یک ضرب دیتا تایپش رو عوض میکنیم
    const id = req.params.id * 1;
    // اون تور خاص رو اسخراج میکنیم
    const tour = tours.find((el) => el.id === id);

    // چک میکنیم که ایا اون ایدی که کلاینت داده اصلا وجود داره یا نه
    // if (id > tours.length) {
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'this tour is not found💔',
        });
    }

    // ارسال دیتا
    res.status(200).json({
        status: 'success',
        data: {
            tours: tour,
        },
    });
});

// ساخت یک تور جدید و زخیره کردن اون داخل فایل جیسون مون
app.post('/api/v1/tours', (req, res) => {
    // ایدی که از قبل وجود داشت رو به دست میاریم و مثبت یک میکنیم
    const newId = tours[tours.length - 1].id + 1;
    // یک ابجکت جدید میسازیم ایدیش با ایدی که ما دادیم ساخته بشه و بقیش با ریکویست بادی
    const newTour = Object.assign({ id: newId }, req.body);

    // و اون رو به تور های قبلی که داشتیم اضافه میکنیم
    tours.push(newTour);

    // داخل فایل هم میزاریمش
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'this tour is not found💔',
        });
    }

    //داخل ریکویست بادی نتونه ایدی رو عوض کنه
    delete req.body.id;

    //جای گذاری مقادیر جدید
    tours[id] = {
        ...tours[id],
        ...req.body,
    };

    // اپ دید کردن فایل دیتامون
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    // ایا وجود دارد
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'this tour is not found💔',
        });
    }

    tours.splice(id, 1);

    // پاک کردن اون ایدی از دیتا بیس یا همون فایلمون
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
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
});

// شروع کردن سرور
const port = 3000;
app.listen(port, () => {
    console.log(`app runing on port : ${port}`);
});
