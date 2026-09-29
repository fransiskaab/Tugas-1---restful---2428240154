// Import Express
const express = require("express");

// Membuat aplikasi Express
const app = express();

// Port server
const PORT = 3000;

// Middleware untuk membaca JSON dari body POST dan PUT
app.use(express.json());

// Data awal laundry
let laundryOrders = [
  {
    id: 1,
    namaPelanggan: "Yusuf Hakim",
    noHp: "085711223344",
    beratKg: 3.5,
    layanan: "express",
    totalHarga: 35000
  },
  {
    id: 2,
    namaPelanggan: "Citra",
    noHp: "081234567890",
    beratKg: 2,
    layanan: "reguler",
    totalHarga: 18000
  },
  {
    id: 3,
    namaPelanggan: "Andi",
    noHp: "082345678901",
    beratKg: 5,
    layanan: "express",
    totalHarga: 50000
  }
];

// ID berikutnya
let nextId = 4;


// ======================================================
// 1. GET /laundry-orders
// Mengambil semua data + filter query string
// Contoh:
// /laundry-orders
// /laundry-orders?layanan=express
// ======================================================

app.get("/laundry-orders", (req, res) => {
  const { layanan } = req.query;

  let hasil = laundryOrders;

  // Filter berdasarkan layanan jika query layanan diberikan
  if (layanan) {
    hasil = laundryOrders.filter(
      (order) => order.layanan === layanan
    );
  }

  res.status(200).json(hasil);
});


// ======================================================
// 2. GET /laundry-orders/:id
// Mengambil satu data berdasarkan ID
// ======================================================

app.get("/laundry-orders/:id", (req, res) => {
  const id = Number(req.params.id);

  const order = laundryOrders.find(
    (data) => data.id === id
  );

  // Jika data tidak ditemukan
  if (!order) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  // Jika data ditemukan
  res.status(200).json(order);
});


// ======================================================
// 3. POST /laundry-orders
// Menambahkan data baru
// ======================================================

app.post("/laundry-orders", (req, res) => {
  const {
    namaPelanggan,
    noHp,
    beratKg,
    layanan,
    totalHarga
  } = req.body;

  // Validasi field wajib
  if (
    namaPelanggan === undefined ||
    noHp === undefined ||
    beratKg === undefined ||
    layanan === undefined ||
    totalHarga === undefined
  ) {
    return res.status(400).json({
      status: "error",
      message: "Semua field wajib diisi",
      data: null
    });
  }

  // Validasi tipe data
  if (
    typeof namaPelanggan !== "string" ||
    typeof noHp !== "string" ||
    typeof beratKg !== "number" ||
    typeof layanan !== "string" ||
    typeof totalHarga !== "number"
  ) {
    return res.status(400).json({
      status: "error",
      message: "Tipe data field tidak sesuai",
      data: null
    });
  }

  // Validasi layanan
  if (layanan !== "reguler" && layanan !== "express") {
    return res.status(400).json({
      status: "error",
      message: "Layanan harus reguler atau express",
      data: null
    });
  }

  // Membuat data baru
  const dataBaru = {
    id: nextId++,
    namaPelanggan,
    noHp,
    beratKg,
    layanan,
    totalHarga
  };

  // Menambahkan ke array
  laundryOrders.push(dataBaru);

  // Response berhasil
  res.status(201).json({
    status: "success",
    message: "Data berhasil ditambahkan",
    data: dataBaru
  });
});


// ======================================================
// 4. PUT /laundry-orders/:id
// Mengubah seluruh data
// ======================================================

app.put("/laundry-orders/:id", (req, res) => {
  const id = Number(req.params.id);

  // Cari index data
  const index = laundryOrders.findIndex(
    (data) => data.id === id
  );

  // Jika ID tidak ditemukan
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  const {
    namaPelanggan,
    noHp,
    beratKg,
    layanan,
    totalHarga
  } = req.body;

  // Semua field wajib diisi
  if (
    namaPelanggan === undefined ||
    noHp === undefined ||
    beratKg === undefined ||
    layanan === undefined ||
    totalHarga === undefined
  ) {
    return res.status(400).json({
      status: "error",
      message: "Semua field wajib diisi",
      data: null
    });
  }

  // Validasi tipe data
  if (
    typeof namaPelanggan !== "string" ||
    typeof noHp !== "string" ||
    typeof beratKg !== "number" ||
    typeof layanan !== "string" ||
    typeof totalHarga !== "number"
  ) {
    return res.status(400).json({
      status: "error",
      message: "Tipe data field tidak sesuai",
      data: null
    });
  }

  // Validasi layanan
  if (layanan !== "reguler" && layanan !== "express") {
    return res.status(400).json({
      status: "error",
      message: "Layanan harus reguler atau express",
      data: null
    });
  }

  // Data baru
  const dataUpdate = {
    id: id,
    namaPelanggan,
    noHp,
    beratKg,
    layanan,
    totalHarga
  };

  // Mengubah data
  laundryOrders[index] = dataUpdate;

  // Response
  res.status(200).json({
    status: "success",
    message: "Data berhasil diubah",
    data: dataUpdate
  });
});


// ======================================================
// 5. DELETE /laundry-orders/:id
// Menghapus data
// ======================================================

app.delete("/laundry-orders/:id", (req, res) => {
  const id = Number(req.params.id);

  // Cari index data
  const index = laundryOrders.findIndex(
    (data) => data.id === id
  );

  // Jika ID tidak ditemukan
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  // Hapus data
  laundryOrders.splice(index, 1);

  // Response berhasil
  res.status(200).json({
    status: "success",
    message: `Data laundry dengan id ${id} berhasil dihapus`,
    data: null
  });
});


// ======================================================
// 6. ROUTE TIDAK DITEMUKAN
// Harus diletakkan PALING BAWAH
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
});


// ======================================================
// Menjalankan server
// ======================================================

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;