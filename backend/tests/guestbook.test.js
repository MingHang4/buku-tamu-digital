import test from 'node:test';
import assert from 'node:assert/strict';

function buildGuestbookPayload(name, message) {
  return { nama: name, pesan: message };
}

test('payload guestbook mengandung nama dan pesan', () => {
  const payload = buildGuestbookPayload('Ali', 'Halo');

  assert.equal(payload.nama, 'Ali');
  assert.equal(payload.pesan, 'Halo');
});

test('payload guestbook harus menolak data kosong', () => {
  const payload = buildGuestbookPayload('', '');

  assert.equal(payload.nama, '');
  assert.equal(payload.pesan, '');
});
