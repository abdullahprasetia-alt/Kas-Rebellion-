"use client";
import { useState } from "react";

export default function Home() {
  const [transaksi, setTransaksi] = useState([]);
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [tipe, setTipe] = useState("masuk");

  const tambah = () => {
    if (!nama || !jumlah) return;

    const data = {
      nama,
      jumlah: Number(jumlah),
      tipe,
      tanggal: new Date().toLocaleString()
    };

    setTransaksi([data, ...transaksi]);
    setNama("");
    setJumlah("");
  };

  const saldo = transaksi.reduce((acc, t) => {
    return t.tipe === "masuk"
      ? acc + t.jumlah
      : acc - t.jumlah;
  }, 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>💰 Kas Kelompok</h1>
      <h2>Saldo: Rp {saldo}</h2>

      <input placeholder="Nama" onChange={e => setNama(e.target.value)} />
      <br />
      <input type="number" placeholder="Jumlah" onChange={e => setJumlah(e.target.value)} />
      <br />

      <select onChange={e => setTipe(e.target.value)}>
        <option value="masuk">Pemasukan</option>
        <option value="keluar">Pengeluaran</option>
      </select>

      <br /><br />
      <button onClick={tambah}>Tambah</button>

      <hr />

      {transaksi.map((t, i) => (
        <div key={i}>
          {t.nama} - {t.tipe} - Rp {t.jumlah}
        </div>
      ))}
    </div>
  );
}
