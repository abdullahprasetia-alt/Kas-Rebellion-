"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [transaksi, setTransaksi] = useState([]);
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [tipe, setTipe] = useState("masuk");
  const [keterangan, setKeterangan] = useState("");

  // Ambil data dari localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("kas-data")) || [];
    setTransaksi(data);
  }, []);

  const tambah = () => {
    if (!nama || !jumlah) return;

    const data = {
      nama,
      jumlah: Number(jumlah),
      tipe,
      keterangan,
      tanggal: new Date().toLocaleString()
    };

    const newData = [data, ...transaksi];

    setTransaksi(newData);
    localStorage.setItem("kas-data", JSON.stringify(newData));

    setNama("");
    setJumlah("");
    setKeterangan("");
  };

  const saldo = transaksi.reduce((acc, t) => {
    return t.tipe === "masuk"
      ? acc + t.jumlah
      : acc - t.jumlah;
  }, 0);

  const totalMasuk = transaksi
    .filter(t => t.tipe === "masuk")
    .reduce((a, b) => a + b.jumlah, 0);

  const totalKeluar = transaksi
    .filter(t => t.tipe === "keluar")
    .reduce((a, b) => a + b.jumlah, 0);

  return (
    <div style={container}>
      <h1 style={{ textAlign: "center" }}>💰 Kas Kelompok</h1>

      <div style={{ textAlign: "center" }}>
        <Link href="/laporan">
          <button style={navButton}>📊 Laporan</button>
        </Link>
      </div>

      {/* Dashboard */}
      <div style={dashboard}>
        <Box title="Saldo" value={saldo} color="#22c55e" />
        <Box title="Masuk" value={totalMasuk} color="#3b82f6" />
        <Box title="Keluar" value={totalKeluar} color="#ef4444" />
      </div>

      {/* Form */}
      <div style={card}>
        <h3>Tambah Transaksi</h3>

        <input style={input} placeholder="Nama" value={nama}
          onChange={e => setNama(e.target.value)} />

        <input style={input} type="number" placeholder="Jumlah"
          value={jumlah} onChange={e => setJumlah(e.target.value)} />

        <input style={input} placeholder="Keterangan"
          value={keterangan} onChange={e => setKeterangan(e.target.value)} />

        <select style={input} value={tipe}
          onChange={e => setTipe(e.target.value)}>
          <option value="masuk">Pemasukan</option>
          <option value="keluar">Pengeluaran</option>
        </select>

        <button style={button} onClick={tambah}>
          Tambah
        </button>
      </div>

      {/* Riwayat */}
      <div style={card}>
        <h3>📜 Riwayat</h3>

        {transaksi.map((t, i) => (
          <div key={i} style={item}>
            <b>{t.nama}</b> - 
            <span style={{
              color: t.tipe === "masuk" ? "#22c55e" : "#ef4444"
            }}>
              {" "}{t.tipe}
            </span>
            <br />
            Rp {t.jumlah}
            <br />
            <small>{t.keterangan}</small>
            <br />
            <small>{t.tanggal}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function Box({ title, value, color }) {
  return (
    <div style={{
      flex: 1,
      background: "#1e293b",
      padding: 15,
      borderRadius: 12,
      borderLeft: `5px solid ${color}`
    }}>
      <p>{title}</p>
      <h2>Rp {value}</h2>
    </div>
  );
}

/* STYLE */
const container = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  padding: 20
};

const dashboard = {
  display: "flex",
  gap: 10,
  marginTop: 20,
  flexWrap: "wrap"
};

const card = {
  marginTop: 20,
  background: "#1e293b",
  padding: 20,
  borderRadius: 12
};

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
  border: "none"
};

const button = {
  width: "100%",
  padding: 12,
  background: "#22c55e",
  border: "none",
  borderRadius: 8,
  color: "white"
};

const navButton = {
  padding: 10,
  background: "#3b82f6",
  border: "none",
  borderRadius: 8,
  color: "white"
};

const item = {
  padding: 10,
  marginBottom: 10,
  background: "#1e293b",
  borderRadius: 10
};    .reduce((a, b) => a + b.jumlah, 0);

  const totalKeluar = transaksi
    .filter(t => t.tipe === "keluar")
    .reduce((a, b) => a + b.jumlah, 0);

  return (
    <div style={container}>
      <h1 style={{ textAlign: "center" }}>💰 Kas Kelompok</h1>

      {/* NAV */}
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <Link href="/laporan">
          <button style={navButton}>📊 Lihat Laporan</button>
        </Link>
      </div>

      {/* DASHBOARD */}
      <div style={dashboard}>
        <div style={box("#22c55e")}>
          <p>Saldo</p>
          <h2>Rp {saldo}</h2>
        </div>

        <div style={box("#3b82f6")}>
          <p>Pemasukan</p>
          <h2>Rp {totalMasuk}</h2>
        </div>

        <div style={box("#ef4444")}>
          <p>Pengeluaran</p>
          <h2>Rp {totalKeluar}</h2>
        </div>
      </div>

      {/* FORM */}
      <div style={card}>
        <h3>Tambah Transaksi</h3>

        <input
          style={input}
          placeholder="Nama"
          value={nama}
          onChange={e => setNama(e.target.value)}
        />

        <input
          style={input}
          type="number"
          placeholder="Jumlah"
          value={jumlah}
          onChange={e => setJumlah(e.target.value)}
        />

        <input
          style={input}
          placeholder="Keterangan"
          value={keterangan}
          onChange={e => setKeterangan(e.target.value)}
        />

        <select
          style={input}
          value={tipe}
          onChange={e => setTipe(e.target.value)}
        >
          <option value="masuk">Pemasukan</option>
          <option value="keluar">Pengeluaran</option>
        </select>

        <button style={button} onClick={tambah}>
          Tambah Transaksi
        </button>
      </div>

      {/* RIWAYAT */}
      <div style={card}>
        <h3>📜 Riwayat Transaksi</h3>

        {transaksi.length === 0 && <p>Belum ada transaksi</p>}

        {transaksi.map((t, i) => (
          <div key={i} style={item}>
            <b>{t.nama}</b> - 
            <span style={{
              color: t.tipe === "masuk" ? "#22c55e" : "#ef4444"
            }}>
              {" "}{t.tipe.toUpperCase()}
            </span>

            <br />
            Rp {t.jumlah}

            {t.keterangan && (
              <>
                <br />
                <small>{t.keterangan}</small>
              </>
            )}

            <br />
            <small>{t.tanggal}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

/* STYLE */
const container = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  padding: 20,
  fontFamily: "Arial"
};

const dashboard = {
  display: "flex",
  gap: 10,
  marginTop: 20,
  flexWrap: "wrap"
};

const box = (color) => ({
  flex: 1,
  background: "#1e293b",
  padding: 15,
  borderRadius: 12,
  borderLeft: `5px solid ${color}`
});

const card = {
  marginTop: 20,
  background: "#1e293b",
  padding: 20,
  borderRadius: 12
};

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
  border: "none"
};

const button = {
  width: "100%",
  padding: 12,
  background: "#22c55e",
  border: "none",
  borderRadius: 8,
  color: "white",
  fontWeight: "bold"
};

const navButton = {
  padding: 10,
  background: "#3b82f6",
  border: "none",
  borderRadius: 8,
  color: "white"
};

const item = {
  padding: 10,
  marginBottom: 10,
  background: "#1e293b",
  borderRadius: 10
};
