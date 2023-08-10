import { test, expect } from '@playwright/test';

const produto = '135586'

test('cotacao', async ({ page }) => {
  
  //Dado que tenha que fazer uma cotação de um produto
  await page.goto('https://www.stg.kabum.com.br')

  const inputproduto = page.locator('#input-busca')
  await inputproduto.fill(produto)
  await page.locator('#barraBuscaKabum button').click();
  await expect(page.locator('.productCard')).toBeVisible();
  // Quando fazer o login com uma conta
  await page.locator('id=linkLoginHeader >> text=LOGIN').click();
  await expect(page.locator('id=linkLoginHeader')).toBeVisible();
  await page.locator('id=login').fill('kabumqateste@gmail.com')
  await page.locator('id=password').waitFor();
  await page.locator('id=password').fill('TesteKabum2021');
  await page.locator('css=button >> text=ENTRAR').click();
  // E realizo uma cotação do produto
  await expect(page.locator('.productCard')).toBeVisible();
  await page.locator('.sc-453addbf-17.iclYuq').click();
  await page.locator('css=button >> text=OK!').click();
  await page.locator('css=button >> text=OK').click();
  
  await expect(page.getByText('Entrega Padrão')).toBeVisible();
  await page.locator('data-testid=btnClose').click();

  // Então adiciono o produto no carrinho
  await page.locator('css=button >> text=COMPRAR').click();
  await expect(page.getByText('PRODUTO ADICIONADO NO CARRINHO')).toBeVisible({timeout: 10000});
  await page.locator('css=button >> text=IR PARA O CARRINHO').click();

  // E vou para o pagamento
  await expect(page.getByText('Entrega Padrão')).toBeVisible({timeout: 10000});
  await page.locator('xpath=(//input[@name="shipping"])[1]').click();
  await page.locator('css=button >> text=IR PARA O PAGAMENTO').click();
  await expect(page.getByText('Forma de Pagamento')).toBeVisible();

});