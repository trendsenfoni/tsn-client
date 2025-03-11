"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { getItem, postItem, putItem } from '@/lib/fetch'
import { useRouter } from 'next/dist/client/components/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { ManagerType } from '@/types/ManagerType'
import { ConnectorType } from '@/types/SettingType'
import Cookies from 'js-cookie'
import { Switch } from '@/components/ui/switch'
interface Props {
  params?: {
    id?: string
  }
}
export default function ConnectorPage({ params }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [admintoken, setAdmintoken] = useState('')
  const [manager, setManager] = useState<ManagerType>({})
  const [connector, setConnector] = useState<ConnectorType>({})

  const save = () => {
    putItem(`/admin/managerSettings/${params?.id}`, admintoken, {
      connector: connector
    })
      .then(result => {
        toast({ title: 'Kayıt Başarılı' })
        // setTimeout(() => { window && window.location.reload() }, 700)
        router.push('/managers')
      })
      .catch(err => toast({ title: 'error', description: err || '' }))
  }

  const Connector = () => {
    const [testResult, setTestResult] = useState('')
    return <>
      <Card className="">
        <CardHeader className='px-3 py-3' >
          <CardTitle>Connector</CardTitle>
          <CardDescription>Anamakinaya kurulmus olan Connector baglanti bilgileri</CardDescription>
        </CardHeader >
        <CardContent className='px-3 py-2'>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label >Client ID</Label>
              <Input
                defaultValue={connector.clientId || ''}
                onBlur={e => setConnector({ ...connector, clientId: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Client Pass</Label>
              <Input
                defaultValue={connector.clientPass || ''}
                onBlur={e => setConnector({ ...connector, clientPass: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Baglanti Turu</Label>
              <Select
                defaultValue={connector.connectionType || 'mssql'}
                onValueChange={e => {
                  setConnector({ ...connector, connectionType: e })
                  // props && props.onConnectionTypeChange && props.onConnectionTypeChange(e)
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="mssql">MS Sql Server</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="pg">PostgreSQL</SelectItem>
                  <SelectItem value="fs">File System</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex flex-col">
          <div className='flex justify-between w-full'>
            <div>
              {!testResult && <>
                <Button
                  variant="secondary"
                  title='Connector test'
                  onClick={() => {
                    postItem(`/admin/managerSettings/connectorTest`, admintoken, { clientId: connector.clientId, clientPass: connector.clientPass })
                      .then(result => setTestResult(`OK\nServer Tarihi:\n${result}`))
                      .catch(err => setTestResult(`Hata:\n${err}`))
                  }}
                >
                  <i className="fa-solid fa-plug me-2"></i> Test
                </Button>
              </>}
              {testResult && <>
                <Button variant="secondary" onClick={() => setTestResult('')}>
                  <i className="fa-solid fa-broom me-2"></i> Temizle
                </Button>
              </>}
            </div>

          </div>
          <div className='w-full mt-2'>
            <pre className='w-full overflow-y-auto max-h-80 text-sm'>
              {testResult}
            </pre>
          </div>
        </CardFooter>
      </Card >
    </>
  }

  const MsSqlConnection = () => {
    const [testResult, setTestResult] = useState('')
    return <>
      <Card className="w11-[340px]">
        <CardHeader className="p-3">
          <CardTitle>MsSql Connection</CardTitle>
          {/* <CardDescription>Anamakinaya kurulmus olan Connector baglanti bilgileri</CardDescription> */}
        </CardHeader>
        <CardContent className='p-3 flex flex-col gap-4'>
          <div className="grid w-full items-center gap-4">
            <div className='grid grid-cols-2 gap-4'>
              <div className="flex flex-col space-y-1.5">
                <Label >MS SQL Server</Label>
                <Input
                  defaultValue={connector.mssql?.server}
                  onBlur={e => setConnector({ ...connector, mssql: { ...connector.mssql, server: e.target.value } })}
                  placeholder='localhost'
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Instance</Label>
                <Input
                  defaultValue={connector.mssql?.dialectOptions?.instanceName}
                  onBlur={e => setConnector({ ...connector, mssql: { ...connector.mssql, dialectOptions: { instanceName: e.target.value } } })}

                />
              </div>

            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className="flex flex-col space-y-1.5">
                <Label>Database (MasterDB)</Label>
                <Input
                  defaultValue={connector.mssql?.database}
                  onBlur={e => setConnector({ ...connector, mssql: { ...connector.mssql, database: e.target.value } })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label >Port</Label>
                <Input
                  type='number'
                  defaultValue={connector.mssql?.port || 1433}
                  onBlur={e => setConnector({ ...connector, mssql: { ...connector.mssql, port: isNaN(Number(e.target.value)) ? 1433 : Number(e.target.value) } })}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className="flex flex-col space-y-1.5">
                <Label>Db User</Label>
                <Input
                  defaultValue={connector.mssql?.user || 'sa'}
                  onBlur={e => setConnector({ ...connector, mssql: { ...connector.mssql, user: e.target.value } })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Db Password</Label>
                <Input
                  type='password'
                  defaultValue={connector.mssql?.password || ''}
                  onBlur={e => setConnector({ ...connector, mssql: { ...connector.mssql, password: e.target.value } })}
                />
              </div>
            </div>
            <div className="">
              <Label className='flex items-center gap-2'>
                <Switch
                  defaultChecked={connector.mssql?.options?.encrypt || false}
                  onCheckedChange={e => setConnector({ ...connector, mssql: { ...connector.mssql, options: { ...connector.mssql?.options, encrypt: e } } })}
                />
                Encrypt
              </Label>
            </div>
            <div className="">
              <Label className='flex items-center gap-2'>
                <Switch
                  defaultChecked={connector.mssql?.options?.trustServerCertificate || false}
                  onCheckedChange={e => setConnector({ ...connector, mssql: { ...connector.mssql, options: { ...connector.mssql?.options, trustServerCertificate: e } } })}

                />
                Trust Server Certificate
              </Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label >Ana Uygulama</Label>
              {connector.mssql &&
                <Select
                  defaultValue={connector.mssql?.mainApp || 'general'}
                  onValueChange={e => setConnector({ ...connector, mssql: { ...connector.mssql, mainApp: e } })}
                >
                  <SelectTrigger >
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="mikro_v16">Mikro V16</SelectItem>
                    <SelectItem value="mikro_v17">Mikro V17 (Desktop)</SelectItem>
                    <SelectItem value="eta_v8">Eta V8 SQL</SelectItem>
                    <SelectItem value="logo_go">Logo Go</SelectItem>
                    <SelectItem value="logo_tiger">Logo Tiger</SelectItem>
                    <SelectItem value="netsis_v3">Netsis V3</SelectItem>
                    <SelectItem value="zirve">Zirve</SelectItem>
                    <SelectItem value="general">Genel</SelectItem>
                  </SelectContent>
                </Select>
              }
              {!connector.mssql && <div>loading</div>}
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex flex-col">
          <div className='flex justify-between w-full'>
            <div>
              {!testResult && <>
                <Button
                  variant="secondary"
                  onClick={() => {
                    postItem(`/admin/managerSettings/mssqlTest`, admintoken, {
                      clientId: connector.clientId,
                      clientPass: connector.clientPass,
                      mssql: connector.mssql,
                    })
                      .then(result => setTestResult(`OK\nTablo Isimleri:\n${JSON.stringify(result.recordsets, null, 2)}`))
                      .catch(err => setTestResult(`Hata:\n${err}`))
                  }}
                >

                  <i className="fa-solid fa-database me-2"></i> SQL Test
                </Button>
              </>}
              {testResult && <>
                <Button variant="secondary" onClick={() => setTestResult('')}>
                  <i className="fa-solid fa-broom me-2"></i> Temizle
                </Button>
              </>}
            </div>

          </div>
          <div className='w-full mt-2'>
            <pre className='w-full overflow-y-auto max-h-80 text-sm'>
              {testResult}
            </pre>
          </div>
        </CardFooter>
      </Card>
    </>
  }

  useEffect(() => { !admintoken && setAdmintoken(Cookies.get('admintoken') || '') }, [])
  useEffect(() => {
    if (admintoken) {
      getItem(`/admin/managerSettings/${params?.id}`, admintoken)
        .then(result => {
          console.log('result:', result)
          setConnector(result?.connector as ConnectorType)
          setManager(result?.manager as ManagerType)
        })
        .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      // .catch(err => console.log('err:', err))

    }
  }, [admintoken])
  return (
    <div className='flex flex-col gap-4'>
      <h1>Manager Connector</h1>
      <hr />
      {connector && <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Connector />
          {connector.connectionType == 'mssql' && <MsSqlConnection />}
        </div>
        <div className='w-full flex flex-row justify-end gap-4'>
          <Button className="text-2xl" variant={'secondary'} onClick={() => router.back()}><i className="fa-solid fa-angle-left"></i>       </Button>
          <Button className="text-2xl" onClick={save} ><i className="fa-solid fa-cloud-arrow-up"></i>        </Button>

        </div>
      </>}
    </div>
  )
}

